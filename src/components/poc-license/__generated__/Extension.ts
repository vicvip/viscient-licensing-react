/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Extension
// ====================================================

export interface Extension_extension {
  __typename: "ActivationPayload";
  response: string | null;
  message: string | null;
  companyName: string | null;
  mongoDbResponse: string | null;
  mailJetResponse: string | null;
  decrementResponse: string | null;
}

export interface Extension {
  extension: Extension_extension | null;
}

export interface ExtensionVariables {
  companyName: string;
  domainName: string;
  numberOfDays: number;
  accountType?: string | null;
}
