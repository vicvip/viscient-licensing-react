import gql from 'graphql-tag';

export const GET_AUTHORS = gql`
    query GetAuthors {
        authors {
            id
            name
        }
    }
`;

export const GET_LICENSES = gql`
    query{
        licenses(name: "viscient"){
            credit {
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
            license {
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
`;
