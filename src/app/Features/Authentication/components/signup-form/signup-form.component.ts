import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ValidationService } from '../../service/validation.service';
import { SpinnerComponent } from '../../../../Shared/components/spinner/spinner.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent, AsyncPipe, RouterLink],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent {
  private validationService = inject(ValidationService);

  isLoading$: Observable<boolean> = this.validationService.isLoading$;

  isError$: Observable<any> = this.validationService.signupError$;
  isSuccess$: Observable<any> = this.validationService.signupSuccess$;

  myForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),

    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ],
    }),

    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(1)],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(1)],
        }),
      },
      {
        validators: [
          this.validationService.equalValues('password', 'confirmPassword'),
        ],
      }
    ),

    age: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(3)],
    }),

    terms: new FormControl(false, {
      validators: [Validators.requiredTrue],
    }),
  });

  onSubmit() {
    this.validationService.submitSignup(this.myForm);
  }

  get emailIsInvalid() {
    return this.validationService.controlFieldIsInvalid(this.myForm, 'email');
  }

  get passwordsIsEqual() {
    return (
      !this.myForm.controls.passwords.valid &&
      this.myForm.controls.passwords.controls.confirmPassword.dirty
    );
  }
}
