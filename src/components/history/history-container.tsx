import * as React from 'react';

import gql from 'graphql-tag';
import { DefaultQuery } from '..';
import { HistoryPanel } from './history-panel';
import { GET_HISTORY, SUBSCRIPTION_HISTORY_MUTATED } from './history-queries';
import { inject } from 'mobx-react';
import { UserObject } from '../../stores';
import { observer } from 'mobx-react';
import { History_history_historyDetail } from './__generated__/History'
import { reportObserved } from 'mobx/lib/core/observable';

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
                        this.unsubscribe = subscribeToHistoryMutated(
                            subscribeToMore, userObject
                        );
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

function subscribeToHistoryMutated(subscribeToMore, userObject: UserObject){
    return subscribeToMore({
        document: SUBSCRIPTION_HISTORY_MUTATED,
        variables: { username: userObject.username, accountType: userObject.accountType},
        updateQuery: (prev, { subscriptionData }) => {
            const data = subscriptionData.data;
            const historyMutated: History_history_historyDetail = data.historyMutated;
            if(!data) return prev;

            //TODO - Maybe a check, and fix the typings
            const newHistory =  Object.assign({}, prev, {
                history: {
                    historyDetail: [historyMutated, ...prev.history.historyDetail],
                    message: prev.history.message, //maybe subs msg?
                    response: prev.history.response,
                    username: prev.history.username,
                    __typename: prev.history.__typename
                }
            });

            return newHistory;
        }
    })
}


function findBook(books, bookId) {
    return books.find(book => book.id === bookId);
}
