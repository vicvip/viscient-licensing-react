/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Activation
// ====================================================

export interface Activation_activation {
  __typename: "ActivationPayload";
  response: string | null;
  message: string | null;
  companyName: string | null;
  mongoDbResponse: string | null;
  mailJetResponse: string | null;
  decrementResponse: string | null;
}

export interface Activation {
  activation: Activation_activation | null;
}

export interface ActivationVariables {
  companyName: string;
  domainName: string;
  numberOfDays: number;
  accountType?: string | null;
}
