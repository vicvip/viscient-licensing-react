import gql from 'graphql-tag';

export const BOOK_FRAGMENT = gql`
    fragment BookFragment on Book {
        id
        name
        publisher {
            id
            name
        }
        authors {
            id
            name
        }
    }
`;

export const GET_BOOKS = gql`
    query GetBooks {
        books {
            ...BookFragment
        }
    }

    ${BOOK_FRAGMENT}
`;

export const GET_HISTORY = gql`
    query History($username: String!){
        history(username: $username){
            username
            message
            response
            historyDetail{
                username
                actionType
                dateCreated
                items{
                    VAppLPR
                    VAppStreamerWS
                    VBrainObject
                    VAppTrafficIntensity
                    VAppPeopleCounter
                    VAppStreamerTornado
                    VAppIllegalPark
                    VAppCounter
                    VAppFP
                    VAppAnalyticsTornado
                    VAppStreamerEventPush
                }
            }
        }
    }
`;