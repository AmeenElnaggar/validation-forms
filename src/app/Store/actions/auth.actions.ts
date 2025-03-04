import { createAction, props } from '@ngrx/store';
import {
  LoginData,
  SignUpData,
} from '../../Features/Authentication/models/auth.model';

export const fetchSignupAction = createAction(
  '[Signup] Create Email',
  props<{ data: SignUpData }>()
);

export const getSignupResponseAction = createAction(
  '[Signup] Get Signup Data',
  props<{ payload: any }>()
);

export const fetchLoginAction = createAction(
  '[Login] Send Request To Backend',
  props<{ data: LoginData }>()
);

export const getLoginResponseAction = createAction(
  '[Login] Get User Logged Data',
  props<{ payload: any }>()
);
