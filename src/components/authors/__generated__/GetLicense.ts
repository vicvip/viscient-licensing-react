import { CredentialDetails } from "crypto";

export interface GetAuthors_authors {
    __typename: 'Author';
    id: string;
    name: string;
}

export interface GetAuthors {
    authors: GetAuthors_authors[];
}

export interface Credit{
    VAppLPR: number,
    VAppStreamerWS: number
}

export interface License{
    VAppLPR: number,
    VAppStreamerWS: number
}

export interface GetLicenses {
    licenses: Licenses
}

export interface Licenses {
    credit: Credit,
    license: License
}