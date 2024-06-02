import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupFormComponent } from './components/signup-form/signup-form.component';



@NgModule({
  declarations: [
    LoginFormComponent,
    SignupFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginFormComponent,
    SignupFormComponent
  ]
})
export class AuthModule { }
