import * as React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

export interface PublishersPanelProps {
    data: GetPublishers;
}

interface UserObjectProps {
    userObject?: UserObject
}

@inject('userObject')
@observer
export class PocLicensePanel extends React.Component<UserObjectProps> {
    @observable showActivationDialog = false;
    @observable showExtensionDialog = false;
    @observable mutationOption = POST_POC_LICENSE_ACTIVATION;

    // state = {
    //     setShowPocLicenseDialog: false,
    //     setShowExtensionDialog: false
    //   };

    public render() {
        const { userObject } = this.props;
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
                    onAddClicked={null}
                />
                <ScrollingPaper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Number of POC License left this month:</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <TableCell>5</TableCell>
                        </TableRow>
                        <TableRow>
                            <Button variant="outlined" size='large' color="primary" style={{marginLeft:'2%', marginTop: '2%'}}
                                onClick={() => { this.extendDomain()}}
                            >
                                Extend POC machine
                            </Button>
                        </TableRow>
                        <TableRow>
                            <Button variant="outlined" size='large' color="primary" style={{marginLeft:'2%', marginTop: '2%'}}
                                    onClick={() => { this.activateNewDomain()}}
                            >
                                Activation
                            </Button>
                        </TableRow>
                        </TableBody>
                    </Table>
                </ScrollingPaper>

                {
                    (this.showActivationDialog || this.showExtensionDialog)  && <Mutation
                        mutation={this.mutationOption}
                        onCompleted={data => { this.hideDialogs(); }}
                      >
                      {
                        mutation => (
                        <PocLicenseDialog
                            isActivation ={ this.showActivationDialog }
                            onSave = {dialogResult => {
                                const variables = {
                                    companyName: userObject.username,
                                    domainName: dialogResult.domainName,
                                    numberOfDays: 10
                                };
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

                {/* {
                    this.state.setShowPocLicenseDialog && <PublisherDialog
                    publisher={"viscient"}
                    onSave = {() => {
                        console.log('yep')
                        const variables = {
                            companyName: "test",
                            domainName: "test",
                            numberOfDays: 10
                        };
                        // mutation({
                        //   variables
                        // });
                        hideActivateDialog();
                        
                      }}
                    onCancel = {() => {hideActivateDialog()}}
                />
                } */}
            </React.Fragment>
        );
    }

    @action
    activateNewDomain = () => {
        this.showActivationDialog = true;
        this.showExtensionDialog = false;
        this.setMutation(this.showActivationDialog);
    };

    @action
    extendDomain = () => {
        this.showActivationDialog = false;
        this.showExtensionDialog = true;
        this.setMutation(this.showActivationDialog);
    };

    @action
    hideDialogs = () => {
        this.showActivationDialog = false;
        this.showExtensionDialog = false;
    }

    @action
    setMutation = (activationDialog) => {
        const mutationOption = activationDialog ? POST_POC_LICENSE_ACTIVATION : POST_POC_LICENSE_EXTENSION
        this.mutationOption = mutationOption;
    }

}


function findPublisher(publishers, publisherId) {
    return publishers.find(publisher => publisher.id === publisherId);
}