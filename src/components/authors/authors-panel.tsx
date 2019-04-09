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
import { Mutation } from 'react-apollo';
import { PanelHeader, ScrollingPaper } from '..';
import { AuthorDialog } from './author-dialog';
import { GET_AUTHORS, GET_LICENSES } from './authors-queries';
import { GetAuthors } from './__generated__/GetAuthors';
import { GetLicenses } from './__generated__/GetLicense';
import { forEachOf, each } from 'async';

export interface AuthorsPanelProps {
    data: GetAuthors;
}

export interface LicensesPanelProps {
    data: GetLicenses;
}

@observer
export class AuthorsPanel extends React.Component<LicensesPanelProps> {
    @observable showAuthorDialog = false;

    @observable isNewAuthor;

    @observable editedAuthor;

    public render() {
        const {
            data: { licenses }
        } = this.props;

        return (
            <React.Fragment>
                <PanelHeader
                    title="License"
                    onAddClicked={this.editNewAuthor}
                />
                <ScrollingPaper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>Number of License</TableCell>
                                <TableCell>Number of Credit</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            Object.keys(licenses.license).map(function(key, index) {
                                
                                //alert(key + ': ' +  licenses.license[key])
                                return (
                                    <TableRow>
                                        <TableCell>{key}</TableCell>
                                        <TableCell>{licenses.license[key]}</TableCell>
                                        <TableCell>{licenses.credit[key]}</TableCell>
                                        <TableCell>
                                            <Button size="small" color="primary" >
                                                Add
                                            </Button></TableCell>
                                    </TableRow>
                                )
                            })
                        }

                            {/* <TableRow>
                                <TableCell>{licenses.license.VAppLPR}</TableCell>
                                <TableCell>test 1</TableCell>
                                <TableCell>Add</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{licenses.license.VAppStreamerWS}</TableCell>
                                <TableCell>test 2</TableCell>
                            </TableRow> */}
                        </TableBody>
                    </Table>
                </ScrollingPaper>

                {this.showAuthorDialog && this.isNewAuthor && (
                    <Mutation mutation={CREATE_AUTHOR}>
                        {createAuthor => (
                            <AuthorDialog
                                author={this.editedAuthor}
                                onSave={author => {
                                    createAuthor({
                                        variables: {
                                            name: author.name
                                        },
                                        // Update AuthorsQuery in Apollo cache
                                        // Needed only in this "Create" case
                                        update: updateAuthorsQuery
                                    });
                                    this.hideAuthorDialog();
                                }}
                                onCancel={this.hideAuthorDialog}
                            />
                        )}
                    </Mutation>
                )}

                {this.showAuthorDialog && !this.isNewAuthor && (
                    <Mutation mutation={UPDATE_AUTHOR}>
                        {updateAuthor => (
                            <AuthorDialog
                                author={this.editedAuthor}
                                onSave={author => {
                                    updateAuthor({
                                        variables: {
                                            authorId: author.id,
                                            name: author.name
                                        }
                                    });
                                    this.hideAuthorDialog();
                                }}
                                onCancel={this.hideAuthorDialog}
                            />
                        )}
                    </Mutation>
                )}
            </React.Fragment>
        );
    }

    @action
    editNewAuthor = () => {
        this.showAuthorDialog = true;
        this.isNewAuthor = true;
        this.editedAuthor = { name: '' };
    };

    @action
    editAuthor = author => {
        this.showAuthorDialog = true;
        this.isNewAuthor = false;
        this.editedAuthor = Object.assign({}, author);
    };

    @action
    hideAuthorDialog = () => {
        this.showAuthorDialog = false;
    };
}

function findAuthor(authors, authorId) {
    return authors.find(author => author.id === authorId);
}

// Function to update AuthorsQuery in Apollo cache
// Needed only in this CREATE_AUTHOR case
function updateAuthorsQuery(store, { data: { createAuthor } }) {
    const data = store.readQuery({
        query: GET_AUTHORS
    }) as any;
    // Don't double add the author
    if (!findAuthor(data.authors, createAuthor.id)) {
        data.authors.push(createAuthor);
        store.writeQuery({
            query: GET_AUTHORS,
            data
        });
    }
}

const CREATE_AUTHOR = gql`
    mutation CreateAuthor($name: String!) {
        createAuthor(name: $name) {
            id
            name
        }
    }
`;

const UPDATE_AUTHOR = gql`
    mutation UpdateAuthor($authorId: ID!, $name: String!) {
        updateAuthor(authorId: $authorId, name: $name) {
            id
            name
        }
    }
`;
