/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: History
// ====================================================

export interface History_history_historyDetail {
  __typename: "HistoryDetail";
  id: string | null;
  username: string | null;
  actionType: string | null;
  domainName: string | null;
  dateCreated: string | null;
  dateExpired: string | null;
}

export interface History_history {
  __typename: "History";
  username: string | null;
  message: string | null;
  response: string | null;
  historyDetail: (History_history_historyDetail | null)[] | null;
}

export interface History {
  history: History_history | null;
}

export interface HistoryVariables {
  username: string;
  accountType: string;
}
