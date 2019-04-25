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
    mutation Activation($companyName: String!, $domainName: String!, $numberOfDays: Int!, $accountType: String){
        activation(companyName: $companyName, domainName: $domainName, numberOfDays: $numberOfDays, accountType: $accountType){
            response
            message
            companyName
            mongoDbResponse
            mailJetResponse
            decrementResponse
        }
    }
`

export const POST_POC_LICENSE_EXTENSION = gql`
    mutation Extension($companyName: String!, $domainName: String!, $numberOfDays: Int!, $accountType: String){
        extension(companyName: $companyName, domainName: $domainName, numberOfDays: $numberOfDays, accountType: $accountType){
            response
            message
            companyName
            mongoDbResponse
            mailJetResponse
            decrementResponse
        }
    }
`
