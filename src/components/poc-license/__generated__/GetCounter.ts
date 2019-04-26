/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCounter
// ====================================================

export interface GetCounter_getCounter {
  __typename: "LoginPayload";
  username: string | null;
  response: string | null;
  pocLicenseCounter: number | null;
}

export interface GetCounter {
  getCounter: GetCounter_getCounter | null;
}

export interface GetCounterVariables {
  username: string;
}
