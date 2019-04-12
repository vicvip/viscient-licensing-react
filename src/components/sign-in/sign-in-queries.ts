import gql from 'graphql-tag';

export const VALIDATE_LOGIN = gql`
    mutation{
        login(username: "viscient", password: "viscient"){
            response
            message
            user
            token
        }
    }
`;

// query LoginQuery($username: String!, $password: String!){
//     login(username: $username, password: $password){
//         user
//         response
//         message
//     }
// }