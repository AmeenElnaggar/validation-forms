import { createReducer, on } from '@ngrx/store';
import {
  getLoginResponseAction,
  getSignupResponseAction,
} from '../actions/auth.actions';

export interface State {
  signupResponse: any;
  loginResponse: any;
}

const initialState: State = {
  signupResponse: '',
  loginResponse: '',
};

export const authReducer = createReducer(
  initialState,
  on(getLoginResponseAction, (state, action) => {
    return { ...state, loginResponse: action.payload };
  }),
  on(getSignupResponseAction, (state, action) => {
    return { ...state, signupResponse: action.payload };
  })
);
