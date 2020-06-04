import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDashboardComponent } from '../accounts/components/account-dashboard/account-dashboard.component'
import { AccountLayoutComponent } from '../../modules/accounts/layout/account-layout.component'
 
const secondaryRoutes: Routes = [
  { path: '', component: AccountLayoutComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(secondaryRoutes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
