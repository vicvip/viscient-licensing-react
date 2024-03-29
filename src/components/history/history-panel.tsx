import * as React from 'react';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import gql from 'graphql-tag';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Mutation } from 'react-apollo';
import { PanelHeader, ScrollingPaper } from '..';
import { AuthorsDialog } from './authors-dialog';
import { BookDialog } from './book-dialog';
import { History } from './__generated__/History';

export interface HistoryPanelProps {
    data: History;
}

@observer
export class HistoryPanel extends React.Component<HistoryPanelProps> {
    public render() {
        const {
            data: { history }
        } = this.props;

        return (
            <React.Fragment>
                <PanelHeader title="History" />
                <ScrollingPaper>
                    <Table>
                        <TableHead >
                            <TableRow >
                                <TableCell>Date Created</TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>Action Type</TableCell>
                                <TableCell>Domain Name</TableCell>
                                <TableCell>Expiry Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                history.historyDetail.map(h => (
                                        <TableRow key={h.id}>
                                            <TableCell>{h.dateCreated}</TableCell>
                                            <TableCell>{h.username}</TableCell>
                                            <TableCell>{h.actionType}</TableCell>
                                            <TableCell>{h.domainName}</TableCell>
                                            <TableCell>{h.dateExpired}</TableCell>
                                        </TableRow>
                                    )
                                )
                            }
                        </TableBody>
                    </Table>
                </ScrollingPaper>

            </React.Fragment>
        );
    }
}

function findBook(books, bookId) {
    return books.find(book => book.id === bookId);
}