export interface PocCounter{
    getCounter: GetCounter
}

export interface PocCounterSubscription{
    pocCounterMutated: GetCounter
}

export interface GetCounter{
    username: string,
    response: string,
    pocLicenseCounter: number
}