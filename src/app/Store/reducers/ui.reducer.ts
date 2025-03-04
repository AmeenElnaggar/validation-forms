import { createReducer, on } from '@ngrx/store';
import {
  // uiStatusAction,
  startLoadingAction,
  stopLoadingAction,
} from '../actions/ui.action';

export interface State {
  isLoading: boolean;
  isError: string;
  isSuccess: string;
}

const initialState: State = {
  isLoading: false,
  isError: '',
  isSuccess: '',
};

export const uiReducer = createReducer(
  initialState,

  on(startLoadingAction, (state, action) => {
    return { ...state, isLoading: true };
  }),

  on(stopLoadingAction, (state, action) => {
    return { ...state, isLoading: false };
  })

  // on(uiStatusAction, (state, action) => {
  //   console.log(action);
  //   return { ...state, isError: action.error, isSuccess: action.success };
  // })
);
