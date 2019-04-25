import * as React from 'react';

import gql from 'graphql-tag';
import { DefaultQuery } from '..';
import { MutationType } from '../../graphql-types';
import { PocLicensePanel } from './poc-license-panel';
import { QUERY_GET_COUNTER, SUBSCRIPTION_POC_COUNTER_MUTATED } from './poc-license-queries';
import { PublisherMutated } from './__generated__/PublisherMutated';
import { inject } from 'mobx-react';
import { UserObject } from '../../stores';
import { observer } from 'mobx-react';
import { PocCounterSubscription, GetCounter } from './__generated__/PocCounter'
import { checkIfStateModificationsAreAllowed } from 'mobx/lib/core/derivation';

interface UserObjectProps {
    userObject?: UserObject
}

@inject('userObject')
@observer
export class PocLicenseContainer extends React.Component<UserObjectProps> {
    unsubscribe = null;

    render() {
        const { userObject } = this.props;
         //return  <PocLicensePanel />;//(
            return (
            <DefaultQuery query={QUERY_GET_COUNTER} variables={{ "username": userObject.username }}>
                {({ data, subscribeToMore }) => {
                    // Subscribe to publisher mutations - only once
                    if (!this.unsubscribe) {
                        this.unsubscribe = subscribeToPocCounterMutated(
                            subscribeToMore
                        );
                    }

                    return <PocLicensePanel data={data} />;
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

function subscribeToPocCounterMutated(subscribeToMore){
    return subscribeToMore({
        document: SUBSCRIPTION_POC_COUNTER_MUTATED,
        updateQuery: (prev, { subscriptionData }) => {
            const data = subscriptionData.data;
            const getCounter: GetCounter = data.pocCounterMutated;
            //console.log(getCounter)
            if(!data) return prev;

            //TODO - Maybe a check, and fix the typings

            return Object.assign({}, prev, {
                getCounter: getCounter
            })
        }
    })
}

//const POC_COUNTER_MUTATED = 'pocCounterMutated'
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

function checkCounter(prevCounter, newCounter) {
    return prevCounter.find(prevCounter => prevCounter.pocLicenseCounter === newCounter);
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
