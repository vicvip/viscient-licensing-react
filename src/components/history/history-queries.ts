import gql from 'graphql-tag';

export const GET_HISTORY = gql`
    query History($username: String!){
        history(username: $username){
            username
            message
            response
            historyDetail{
                username
                actionType
                domainName
                dateCreated
                dateExpired
            }
        }
    }
`;