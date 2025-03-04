import { StoreInterface } from '../store';

export const signupResponseSelector = (state: StoreInterface) => {
  return state.auth.signupResponse;
};
export const loginResponseSelector = (state: StoreInterface) => {
  return state.auth.loginResponse;
};
