import * as React from 'react';

import gql from 'graphql-tag';
import { DefaultQuery } from '..';
import { PaidLicensePanel } from './paid-license-panel';
import { GET_LICENSES } from './paid-license-queries';
import { inject } from 'mobx-react';
import { UserObject } from '../../stores';
import { observer } from 'mobx-react';

interface PaidLicenseContainerProps {
    userObject?: UserObject
}

@inject('userObject')
@observer
export class PaidLicenseContainer extends React.Component<PaidLicenseContainerProps> {
    unsubscribe = null;

    render() {
        const { userObject } = this.props;
        return (
            <DefaultQuery query={GET_LICENSES} variables={{"username": userObject.username}}>
                {({ data }) => {
                    return <PaidLicensePanel data={data} />;
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