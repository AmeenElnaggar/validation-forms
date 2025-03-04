import { Routes } from '@angular/router';
import { HomePageComponent } from './Features/home/page/home-page/home-page.component';
import { LoginPageComponent } from './Features/Authentication/page/login-page/login-page.component';
import { SignupPageComponent } from './Features/Authentication/page/signup-page/signup-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: HomePageComponent },
];
