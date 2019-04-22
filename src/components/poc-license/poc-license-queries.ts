import gql from 'graphql-tag';

export const GET_PUBLISHERS = gql`
    query GetPublishers {
        publishers {
            id
            name
        }
    }
`;

export const POST_POC_LICENSE_ACTIVATION = gql`
    mutation Activation($companyName: String!, $domainName: String!, $numberOfDays: Int!){
        activation(companyName: $companyName, domainName: $domainName, numberOfDays: $numberOfDays){
            response
            message
            companyName
            mongoDbResponse
        }
    }
`

export const POST_POC_LICENSE_EXTENSION = gql`
    mutation Extension($companyName: String!, $domainName: String!, $numberOfDays: Int!){
        extension(companyName: $companyName, domainName: $domainName, numberOfDays: $numberOfDays){
            response
            message
            companyName
            mongoDbResponse
        }
    }
`
