import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ValidationService } from '../../service/validation.service';
import { SpinnerComponent } from '../../../../Shared/components/spinner/spinner.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent, AsyncPipe],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private validationService = inject(ValidationService);

  isLoading$: Observable<boolean> = this.validationService.isLoading$;
  isError$: Observable<any> = this.validationService.loginError$;

  myForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(30),
      ],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
      ],
    }),
  });

  get emailIsInvalid() {
    return this.validationService.controlFieldIsInvalid(this.myForm, 'email');
  }

  onSubmit() {
    this.validationService.submitLogin(this.myForm);
  }
}
