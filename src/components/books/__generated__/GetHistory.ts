export interface License{
    VAppStreamerWS: number, 
    VBrainObject: number, 
    VAppTrafficIntensity: number, 
    VAppPeopleCounter : number,
    VAppStreamerTornado: number, 
    VAppIllegalPark: number, 
    VAppCounter: number, 
    VAppFP: number, 
    VAppAnalyticsTornado: number, 
    VAppStreamerEventPush: number
}

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
    username: string,
    actionType: string,
    dateCreated: string,
    items: License
}