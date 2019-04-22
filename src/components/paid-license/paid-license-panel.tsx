import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { PanelHeader, ScrollingPaper } from '..';
import { GetLicenses } from './__generated__/GetLicense';

export interface PaidLicensePanelProps {
    data: GetLicenses;
}

@observer
export class PaidLicensePanel extends React.Component<PaidLicensePanelProps> {
    public render() {
        const {
            data: { licenses }
        } = this.props;

        return (
            <React.Fragment>
                <PanelHeader
                    title="Paid License"
                    onAddClicked={null}
                />
                <ScrollingPaper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/* {alert(localStorage.getItem('auth_token'))} */}
                                <TableCell>Type</TableCell>
                                <TableCell>Number of License</TableCell>
                                {/* <TableCell>Number of Credit</TableCell> */}
                                {/* <TableCell align='center'>Action</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            Object.keys(licenses.license).map(function(key, index) {
                                if(index >= (Object.keys(licenses.license).length - 1)){
                                    return;
                                }
                                return (
                                    <TableRow>
                                        <TableCell>{key}</TableCell>
                                        <TableCell>{licenses.license[key]}</TableCell>
                                        {/* <TableCell>{licenses.credit[key]}</TableCell>
                                        <TableCell align='center' >
                                            <Button size='small' color="primary" >
                                                Add
                                            </Button>
                                        </TableCell> */}
                                    </TableRow>
                                )
                            })
                        }
                        </TableBody>
                    </Table>
                </ScrollingPaper>
            </React.Fragment>
        );
    }
}

function findAuthor(authors, authorId) {
    return authors.find(author => author.id === authorId);
}

