import * as React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import gql from 'graphql-tag';
import { action, observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Mutation } from 'react-apollo';
import { PanelHeader, ScrollingPaper } from '..';
import { PocLicenseDialog } from './poc-license-dialog';
import { GET_PUBLISHERS } from './poc-license-queries';
import { GetPublishers } from './__generated__/GetPublishers';
import Button from '@material-ui/core/Button';
import { POST_POC_LICENSE_ACTIVATION, POST_POC_LICENSE_EXTENSION } from './poc-license-queries';
import { UserObject } from '../../stores';
import { PocCounter } from './__generated__/PocCounter'
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface PublishersPanelProps {
    data: GetPublishers;
}

export interface PocLicensePanelProps {
    userObject?: UserObject
    data: PocCounter
}

@inject('userObject')
@observer
export class PocLicensePanel extends React.Component<PocLicensePanelProps> {
    @observable showActivationDialog = false;
    @observable showExtensionDialog = false;
    @observable showInsufficientCounterDialog = false;
    @observable mutationOption = POST_POC_LICENSE_ACTIVATION;

    // state = {
    //     setShowPocLicenseDialog: false,
    //     setShowExtensionDialog: false
    //   };

    public render() {
        const { userObject, data: { getCounter } } = this.props;
        //console.log(getCounter.pocLicenseCounter);
        //const [showPocLicenseDialog, setShowPocLicenseDialog] = useState(false);
        // this.state ={
        //     setShowPocLicenseDialog: false
        // }
        // const showActivateDialog = () => {
        //     this.setState({
        //         setShowPocLicenseDialog: true
        //       })
        // };

        // const showExtensionDialog = () => {
        //     this.setState({
        //         setShowExtensionDialog: true
        //       })
        // };

        // const hideActivateDialog = () => {
        //     this.setState({
        //         setShowPocLicenseDialog: false,
        //         setShowExtensionDialog: false
        //       })
        // };

        return (
            <React.Fragment>
                <PanelHeader
                    title="POC License"
                />
                <ScrollingPaper>

                <Table>
                    <TableHead >
                        <TableRow >
                            <TableCell>Number of POC License left this month:</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                style={{height: '50%'}}
                >
                    <Grid item xs={4}>
                            <Typography component="h1" variant="h1" align="center">
                                {getCounter.pocLicenseCounter}
                            </Typography>
                            <Typography component="h3" variant="subtitle2" align="center">
                                credit(s)
                            </Typography>
                        
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="outlined" size='large' color="primary" style={{marginLeft:'2%', marginTop: '2%'}}
                            onClick={() => { this.extendDomain(getCounter.pocLicenseCounter)}}
                        >
                            Extend POC machine
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="outlined" size='large' color="primary" style={{marginLeft:'2%', marginTop: '2%'}}
                                onClick={() => { this.activateNewDomain(getCounter.pocLicenseCounter)}}
                        >
                            Activation
                        </Button>
                    </Grid>
                </Grid>
                    {/* <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Number of POC License left this month:</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Button variant="outlined" size='large' color="primary" style={{marginLeft:'2%', marginTop: '2%'}}
                                    onClick={() => { this.extendDomain(getCounter.pocLicenseCounter)}}
                                >
                                    Extend POC machine
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                                <TableCell>
                                <Button variant="outlined" size='large' color="primary" style={{marginLeft:'2%', marginTop: '2%'}}
                                        onClick={() => { this.activateNewDomain(getCounter.pocLicenseCounter)}}
                                >
                                    Activation
                                </Button>
                            </TableCell>
                        </TableRow>
                        </TableBody>
                    </Table> */}
                </ScrollingPaper>

                {
                    (this.showActivationDialog || this.showExtensionDialog)  && <Mutation
                        mutation={this.mutationOption}
                        onCompleted={data => { this.hideDialogs(); }}
                      >
                      {
                        mutation => (
                        <PocLicenseDialog
                            dialogObject ={ {isActivation: this.showActivationDialog, userObject: userObject} }
                            onSave = {dialogResult => {
                                let variables;
                                if(userObject.accountType === 'admin'){
                                    variables = {
                                        companyName: dialogResult.companyName,
                                        domainName: dialogResult.domainName,
                                        numberOfDays: Number(dialogResult.numberOfDays) || 10,
                                        accountType: userObject.accountType
                                    };
                                } else {
                                    variables = {
                                        companyName: userObject.username,
                                        domainName: dialogResult.domainName,
                                        numberOfDays: 10,
                                        accountType: userObject.accountType
                                    };
                                }
                                
                                mutation({
                                  variables
                                });
                                //TODO - Disable dialog and implement loading progress
                              }}
                            onCancel = {() => {this.hideDialogs()}}
                        />)
                      }
                      </Mutation>
                }

                {
                    this.showInsufficientCounterDialog && 
                    <PocLicenseDialog
                        dialogObject = {{isActivation: this.showActivationDialog, userObject: userObject, pocCounter: getCounter.pocLicenseCounter}}
                        onSave = {() => {this.hideDialogs()}}
                        onCancel = {() => {this.hideDialogs()}}
                    />
                }
            </React.Fragment>
        );
    }

    @action
    activateNewDomain = (pocCounter) => {
        this.showActivationDialog = true;
        this.showExtensionDialog = false;
        if(pocCounter <= 0){
            this.insufficientCounterDialog();
        }else{
            this.setMutation(this.showActivationDialog);
        }
    };

    @action
    extendDomain = (pocCounter) => {
        this.showActivationDialog = false;
        this.showExtensionDialog = true;
        if(pocCounter <= 0){
            this.insufficientCounterDialog();
        }else{
            this.setMutation(this.showActivationDialog);
        }
    };

    @action
    hideDialogs = () => {
        this.showActivationDialog = false;
        this.showExtensionDialog = false;
        this.showInsufficientCounterDialog = false;
    }

    @action
    setMutation = (activationDialog) => {
        const mutationOption = activationDialog ? POST_POC_LICENSE_ACTIVATION : POST_POC_LICENSE_EXTENSION
        this.mutationOption = mutationOption;
    }

    @action
    insufficientCounterDialog = () => {
        this.showActivationDialog = false;
        this.showExtensionDialog = false;
        this.showInsufficientCounterDialog = true;
    }

}


function findPublisher(publishers, publisherId) {
    return publishers.find(publisher => publisher.id === publisherId);
}