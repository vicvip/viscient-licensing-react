import * as React from 'react';

import gql from 'graphql-tag';
import { DefaultQuery } from '..';
import { MutationType } from '../../graphql-types';
import { HistoryPanel } from './history-panel';
import { BookMutated } from './__generated__/BookMutated';
import { GET_HISTORY } from './history-queries';
import {GET_LICENSES} from '../paid-license/paid-license-queries';
import { inject } from 'mobx-react';
import { UserObject } from '../../stores';
import { observer } from 'mobx-react';

interface UserObjectProps {
    userObject?: UserObject
}

@inject('userObject')
@observer
export class HistoryContainer extends React.Component<UserObjectProps> {
    unsubscribe = null;

    render() {
        const { userObject } = this.props;
        return (
            <DefaultQuery query={GET_HISTORY} variables={{ "username": userObject.username, "accountType": userObject.accountType }}>
                {({ data, subscribeToMore }) => {
                    // Subscribe to author mutations - only once
                    if (!this.unsubscribe) {
                        // this.unsubscribe = subscribeToBookMutations(
                        //     subscribeToMore
                        // );
                    }
                    return <HistoryPanel data={data} />;
                }}
            </DefaultQuery>
        );
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}

function findBook(books, bookId) {
    return books.find(book => book.id === bookId);
}
