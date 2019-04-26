/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  __typename: "LoginPayload";
  response: string | null;
  message: string | null;
  username: string | null;
  token: string | null;
  accountType: string | null;
}

export interface Login {
  login: Login_login | null;
}

export interface LoginVariables {
  username: string;
  password: string;
}
