import gql from 'graphql-tag';

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

export const QUERY_GET_COUNTER = gql`
    query GetCounter($username: String!){
        getCounter(username: $username){
            username
            response
            pocLicenseCounter
        }
    }
`
export const SUBSCRIPTION_POC_COUNTER_MUTATED = gql`
    subscription PocCounterMutated {
        pocCounterMutated{
            username
            pocLicenseCounter
            response
            accountType
        }
    }
`

