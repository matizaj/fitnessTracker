import { Action } from '@ngrx/store';
import { AuthActions, SET_AUTH, SET_UNAUTH } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initailState: State = {
    isAuthenticated: false
};

export function authReducer(state = initailState, action: AuthActions) {
    switch (action.type) {
        case SET_AUTH:
        return {isAuthenticated: true};
        case SET_UNAUTH:
        return {isAuthenticated: false};
        default:
        return state;
    }
}


export const getIsAuthyenticated = (state: State) => state.isAuthenticated;
