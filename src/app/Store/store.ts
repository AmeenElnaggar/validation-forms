import { ActionReducerMap } from '@ngrx/store';
import * as fromUi from './reducers/ui.reducer';
import * as fromAuth from './reducers/auth.reducer';

export interface StoreInterface {
  ui: fromUi.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<StoreInterface> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
};
