/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: HistoryMutated
// ====================================================

export interface HistoryMutated_historyMutated {
  __typename: "HistoryDetail";
  id: string | null;
  username: string | null;
  actionType: string | null;
  domainName: string | null;
  dateCreated: string | null;
  dateExpired: string | null;
}

export interface HistoryMutated {
  historyMutated: HistoryMutated_historyMutated | null;
}

export interface HistoryMutatedVariables {
  username?: string | null;
  accountType?: string | null;
}
