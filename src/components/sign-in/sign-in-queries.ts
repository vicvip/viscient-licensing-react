import gql from 'graphql-tag';

export const VALIDATE_LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      response
      message
      username
      token
      accountType
    }
  }
`;