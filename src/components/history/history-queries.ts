import gql from 'graphql-tag';

export const GET_HISTORY = gql`
    query History($username: String!, $accountType: String!){
        history(username: $username, accountType: $accountType){
            username
            message
            response
            historyDetail{
              	id
                username
                actionType
                domainName
                dateCreated
                dateExpired
            }
        }
    }
`;

export const SUBSCRIPTION_HISTORY_MUTATED = gql`
    subscription HistoryMutated($username: String, $accountType: String){
        historyMutated(username: $username, accountType: $accountType){
            id
            username
            actionType
            domainName
            dateCreated
            dateExpired
        }
    }
`