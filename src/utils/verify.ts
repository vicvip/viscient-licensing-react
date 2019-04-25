import  { verify, sign } from 'jsonwebtoken';

export const APP_SECRET = 'GraphQL-is-aw3some'

export function getUserId(token: any){
    //const Authorization = context.request.get('Authorization');
    const username  = verify(token, APP_SECRET);
        return username.username;
    // if(Authorization){
    //     const token = Authorization.replace('Bearer ', '');
    //     const username  = verify(token, APP_SECRET);
    //     return username;
    // };
}

export function encryptAccountType(type){
    const accountTypeToken = sign(type, APP_SECRET);
    return accountTypeToken;
}

export function decryptAccountType(type){
    const accountTypeToken = verify(type, APP_SECRET);
    return accountTypeToken;
}