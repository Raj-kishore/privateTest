import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { LoginForm } from './components/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginLayoutComponent, LoginForm],
  imports: [
    CommonModule,
    LoginRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class LoginModule { }
