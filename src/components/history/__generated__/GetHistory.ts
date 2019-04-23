export interface GetHistory {
    history: History
}

export interface History{
    username: string,
    message: string,
    response: string,
    historyDetail: [HistoryDetail]
}

export interface HistoryDetail {
    id: string,
    username: string,
    actionType: string,
    domainName: string,
    dateCreated: string,
    dateExpired: string
}