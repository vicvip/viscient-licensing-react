/* tslint:disable */
// This file was automatically generated and should not be edited.

import { MutationType } from './../../../graphql-types';

// ====================================================
// GraphQL subscription operation: PublisherMutated
// ====================================================

export interface PublisherMutated_publisherMutated_node {
    id: string;
    name: string;
}

export interface PublisherMutated_publisherMutated {
    mutation: MutationType;
    node: PublisherMutated_publisherMutated_node;
}

export interface PublisherMutated {
    publisherMutated: PublisherMutated_publisherMutated;
}
