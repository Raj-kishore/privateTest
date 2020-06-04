import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginForm } from '../login/components/login-form/login-form.component'


const secondaryRoutes: Routes = [
  { path: '', component: LoginForm, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(secondaryRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
