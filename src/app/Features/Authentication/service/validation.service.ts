import { inject, Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../Store/store';
import {
  fetchLoginAction,
  fetchSignupAction,
} from '../../../Store/actions/auth.actions';
import { map, Observable, timer } from 'rxjs';
import { spinnerOfUiSelector } from '../../../Store/selectors/ui.selector';
import { Router } from '@angular/router';
import {
  loginResponseSelector,
  signupResponseSelector,
} from '../../../Store/selectors/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private store = inject(Store<StoreInterface>);
  private router = inject(Router);

  isLoading$: Observable<boolean> = this.store.select(spinnerOfUiSelector);

  signupError$: Observable<boolean> = this.store
    .select(signupResponseSelector)
    .pipe(
      map((response: any) => (response.error ? response.error.message : ''))
    );

  signupSuccess$: Observable<boolean> = this.store
    .select(signupResponseSelector)
    .pipe(map((response: any) => (response.success ? response.message : '')));

  loginError$: Observable<boolean> = this.store
    .select(loginResponseSelector)
    .pipe(
      map((response: any) => (response.error ? response.error.message : ''))
    );

  equalValues(controlName1: string, controlName2: string) {
    return (control: AbstractControl) => {
      const val1 = control.get(controlName1)?.value;
      const val2 = control.get(controlName2)?.value;
      if (val1 === val2) {
        return null;
      }
      return { valuesNotEqual: true };
    };
  }

  controlFieldIsInvalid(form: FormGroup, controlName: string) {
    const control = form.get(controlName)!;
    return control.dirty && control.touched && control.invalid;
  }

  submitSignup(form: FormGroup) {
    const enteredData = {
      userName: form.value.name!,
      email: form.value.email!,
      password: form.value.passwords!.password!,
      rePassword: form.value.passwords!.confirmPassword!,
      age: +form.value.age!,
    };
    this.store.dispatch(fetchSignupAction({ data: enteredData }));
    this.signupSuccess$.subscribe((response: any) => {
      if (response.success) {
        timer(1000).subscribe(() => {
          this.router.navigate(['/login'], { replaceUrl: true });
        });
      }
    });
  }

  submitLogin(form: FormGroup) {
    const enteredData = {
      email: form.value.email!,
      password: form.value.password!,
    };
    this.store.dispatch(fetchLoginAction({ data: enteredData }));
  }
}
