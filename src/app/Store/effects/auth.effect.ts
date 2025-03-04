import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  fetchLoginAction,
  fetchSignupAction,
  getLoginResponseAction,
  getSignupResponseAction,
  // getSignupResponseAction,
} from '../actions/auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoreInterface } from '../store';
import { Store } from '@ngrx/store';
import { startLoadingAction, stopLoadingAction } from '../actions/ui.action';

export class AuthenticationEffect {
  private actions$ = inject(Actions);
  private httpClient = inject(HttpClient);
  private store = inject(Store<StoreInterface>);

  signupEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSignupAction),
      tap(() => this.store.dispatch(startLoadingAction())),
      switchMap(({ data }) => {
        return this.httpClient
          .post(
            'https://clothingapp-production-681d.up.railway.app/api/v1/auth/signup',
            data
          )
          .pipe(
            map((responseSuccess: any) => {
              this.store.dispatch(stopLoadingAction());
              return getSignupResponseAction({ payload: responseSuccess });
            }),
            catchError((responseError: any) => {
              this.store.dispatch(stopLoadingAction());
              return of(getSignupResponseAction({ payload: responseError }));
            })
          );
      })
    )
  );

  loginEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchLoginAction),
      tap(() => this.store.dispatch(startLoadingAction())),
      switchMap(({ data }) => {
        console.log('From Request', data);
        return this.httpClient
          .post(
            'https://clothingapp-production-681d.up.railway.app/api/v1/auth/login',
            data
          )
          .pipe(
            map((responseSuccess: any) => {
              console.log('Success : ', responseSuccess);
              this.store.dispatch(stopLoadingAction());
              return getLoginResponseAction({ payload: responseSuccess });
            }),
            catchError((responseError: any) => {
              console.log('Error : ', responseError);
              this.store.dispatch(stopLoadingAction());
              return of(getLoginResponseAction({ payload: responseError }));
            })
          );
      })
    )
  );
}
