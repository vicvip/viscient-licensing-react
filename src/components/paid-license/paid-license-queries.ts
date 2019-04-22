import gql from 'graphql-tag';

export const GET_LICENSES = gql`
    query Licenses($username: String){
        licenses(username: $username){
            license{
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
            credit{
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
