import * as React from 'react';

import gql from 'graphql-tag';
import { DefaultQuery } from '..';
import { PocLicensePanel } from './poc-license-panel';
import { QUERY_GET_COUNTER, SUBSCRIPTION_POC_COUNTER_MUTATED } from './poc-license-queries';
import { inject } from 'mobx-react';
import { UserObject } from '../../stores';
import { observer } from 'mobx-react';
import { GetCounter } from './__generated__/GetCounter'

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
                    if (!this.unsubscribe && userObject.accountType !== 'admin') {
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

function checkCounter(prevCounter, newCounter) {
    return prevCounter.find(prevCounter => prevCounter.pocLicenseCounter === newCounter);
}
