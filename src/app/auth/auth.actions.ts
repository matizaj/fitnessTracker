import { Action } from '@ngrx/store';

export const SET_AUTH = '[AUTH] Set auntenticated';
export const SET_UNAUTH = '[AUTH] Set unauntenticated';


export class SetAuthenticated implements Action {
    readonly type = SET_AUTH;
}
export class SetUnAuthenticated implements Action {
    readonly type = SET_UNAUTH;
}
export type AuthActions = SetAuthenticated | SetUnAuthenticated;
