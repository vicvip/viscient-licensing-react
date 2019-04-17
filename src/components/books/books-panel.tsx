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
import { GetAuthors } from '../authors/__generated__/GetAuthors';
import { GetPublishers } from '../publishers/__generated__/GetPublishers';
import { AuthorsDialog } from './authors-dialog';
import { BookDialog } from './book-dialog';
import { BOOK_FRAGMENT, GET_BOOKS } from './books-queries';
import { GetBooks } from './__generated__/GetBooks';
import { CreateBookVariables } from './__generated__/CreateBook';
import { UpdateBookVariables } from './__generated__/UpdateBook';
import { SetBookAuthorsVariables } from './__generated__/SetBookAuthors';
import { GetHistory } from './__generated__/GetHistory';

export interface BooksPanelProps {
    dataBooks: GetBooks;
    dataAuthors: GetAuthors;
    dataPublishers: GetPublishers;
}

export interface HistoryPanelProps {
    data: GetHistory;
}

@observer
export class BooksPanel extends React.Component<HistoryPanelProps> {
    @observable showBookDialog = false;
    @observable showAuthorsDialog = false;

    @observable isNewBook;

    @observable editedBook;

    public render() {
        const {
            data: { history }
        } = this.props;

        return (
            <React.Fragment>
                <PanelHeader title="History" onAddClicked={this.editNewBook} />
                <ScrollingPaper>
                    <Table>
                        <TableHead>
                            <TableRow>
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
                                        <TableRow>
                                            <TableCell>{h.dateCreated}</TableCell>
                                            <TableCell>{h.username}</TableCell>
                                            <TableCell>{h.actionType}</TableCell>
                                            <TableCell>{h.domainName}</TableCell>
                                            <TableCell>{h.dateExpired}</TableCell>
                                        </TableRow>
                                    )
                                )
                            }
                            {/* {books.map(book => (
                                <TableRow
                                    hover
                                    key={book.id}
                                    onClick={() => this.editBook(book)}
                                >
                                    <TableCell>{book.name}</TableCell>
                                    <TableCell>{book.publisher.name}</TableCell>
                                    <TableCell>
                                        {book.authors
                                            .map(author => author.name)
                                            .join(', ')}
                                    </TableCell>
                                    <TableCell
                                        onClick={e => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <Button
                                            onClick={() =>
                                                this.editAuthors(book)
                                            }
                                        >
                                            Edit Authors
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
                </ScrollingPaper>

            </React.Fragment>
        );
    }

    @action
    editNewBook = () => {
        this.showBookDialog = true;
        this.isNewBook = true;
        this.editedBook = { name: '', publisherId: '' };
    };

    @action
    editBook = book => {
        this.showBookDialog = true;
        this.isNewBook = false;
        this.editedBook = Object.assign({}, book, {
            publisherId: book.publisher.id
        });
    };

    @action
    editAuthors = book => {
        this.showAuthorsDialog = true;
        this.isNewBook = false;
        this.editedBook = Object.assign({}, book, {
            publisherId: book.publisher.id
        });
    };

    @action
    hideBookDialog = () => {
        this.showBookDialog = false;
    };

    @action
    hideAuthorsDialog = () => {
        this.showAuthorsDialog = false;
    };
}

function findBook(books, bookId) {
    return books.find(book => book.id === bookId);
}

// Function to update BooksQuery in Apollo cache
// Needed only in the CREATE_BOOK use case
function updateBooksQuery(store, { data: { createBook } }) {
    const data = store.readQuery({
        query: GET_BOOKS
    }) as any;
    // Don't double add the book
    if (!findBook(data.books, createBook.id)) {
        data.books.push(createBook);
        store.writeQuery({
            query: GET_BOOKS,
            data
        });
    }
}

const CREATE_BOOK = gql`
    mutation CreateBook($book: BookInput!) {
        createBook(book: $book) {
            ...BookFragment
        }
    }

    ${BOOK_FRAGMENT}
`;

const UPDATE_BOOK = gql`
    mutation UpdateBook($bookId: ID!, $book: BookInput!) {
        updateBook(bookId: $bookId, book: $book) {
            ...BookFragment
        }
    }

    ${BOOK_FRAGMENT}
`;

const SET_BOOK_AUTHORS = gql`
    mutation SetBookAuthors($bookId: ID!, $authorIds: [ID!]!) {
        setBookAuthors(bookId: $bookId, authorIds: $authorIds) {
            ...BookFragment
        }
    }

    ${BOOK_FRAGMENT}
`;
