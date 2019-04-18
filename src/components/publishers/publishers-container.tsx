import * as React from 'react';

import gql from 'graphql-tag';
import { DefaultQuery } from '..';
import { MutationType } from '../../graphql-types';
import { PublishersPanel } from './publishers-panel';
import { GET_HISTORY } from './../books/books-queries';
import { PublisherMutated } from './__generated__/PublisherMutated';
import { inject } from 'mobx-react';
import { UserObject } from '../../stores';
import { observer } from 'mobx-react';

interface UserObjectProps {
    userObject?: UserObject
}

@inject('userObject')
@observer
export class PublishersContainer extends React.Component<UserObjectProps> {
    unsubscribe = null;

    render() {
        const { userObject } = this.props;
        return (
            <DefaultQuery query={GET_HISTORY} variables={{ "username": userObject.username }}>
                {({ data, subscribeToMore }) => {
                    // Subscribe to publisher mutations - only once
                    if (!this.unsubscribe) {
                        // this.unsubscribe = subscribeToPublisherMutations(
                        //     subscribeToMore
                        // );
                    }

                    return <PublishersPanel data={data} />;
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

function subscribeToPublisherMutations(subscribeToMore) {
    return subscribeToMore({
        document: PUBLISHER_MUTATED,
        updateQuery: (prev, { subscriptionData }) => {
            const data: PublisherMutated = subscriptionData.data;
            if (!data) return prev;

            const publisherMutated = data.publisherMutated;

            switch (publisherMutated.mutation) {
                case MutationType.CREATED: {
                    const newPublisher = publisherMutated.node;
                    // Don't double add the publisher
                    if (findPublisher(prev.publishers, newPublisher.id)) {
                        return prev;
                    } else {
                        // Publisher not found, add it
                        return Object.assign({}, prev, {
                            publishers: [...prev.publishers, newPublisher]
                        });
                    }
                }
                case MutationType.UPDATED: {
                    const updatedPublisher = publisherMutated.node;
                    // Replace previous publisher with updated one
                    return Object.assign({}, prev, {
                        publishers: prev.publishers.map(publisher =>
                            publisher.id === updatedPublisher.id
                                ? updatedPublisher
                                : publisher
                        )
                    });
                }
                case MutationType.DELETED: {
                    const deletedPublisher = publisherMutated.node;
                    // Delete publisher
                    return Object.assign({}, prev, {
                        publishers: prev.publishers.filter(
                            publisher => publisher.id !== deletedPublisher.id
                        )
                    });
                }
                default:
                    return prev;
            }
        }
    });
}

function findPublisher(publishers, publisherId) {
    return publishers.find(publisher => publisher.id === publisherId);
}

const PUBLISHER_MUTATED = gql`
    subscription PublisherMutated {
        publisherMutated {
            mutation
            node {
                __typename
                id
                name
            }
        }
    }
`;
