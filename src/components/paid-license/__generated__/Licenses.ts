/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Licenses
// ====================================================

export interface Licenses_licenses_license {
  __typename: "License";
  VAppLPR: number | null;
  VAppStreamerWS: number | null;
  VBrainObject: number | null;
  VAppTrafficIntensity: number | null;
  VAppPeopleCounter: number | null;
  VAppStreamerTornado: number | null;
  VAppIllegalPark: number | null;
  VAppCounter: number | null;
  VAppFP: number | null;
  VAppAnalyticsTornado: number | null;
  VAppStreamerEventPush: number | null;
}

export interface Licenses_licenses_credit {
  __typename: "Credit";
  VAppLPR: number | null;
  VAppStreamerWS: number | null;
  VBrainObject: number | null;
  VAppTrafficIntensity: number | null;
  VAppPeopleCounter: number | null;
  VAppStreamerTornado: number | null;
  VAppIllegalPark: number | null;
  VAppCounter: number | null;
  VAppFP: number | null;
  VAppAnalyticsTornado: number | null;
  VAppStreamerEventPush: number | null;
}

export interface Licenses_licenses {
  __typename: "Licenses";
  license: Licenses_licenses_license | null;
  credit: Licenses_licenses_credit | null;
}

export interface Licenses {
  licenses: Licenses_licenses | null;
}

export interface LicensesVariables {
  username?: string | null;
}
