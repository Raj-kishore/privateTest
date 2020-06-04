import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AuthManager } from './helpers/auth-manager';
import { AuthGuard } from '../app/guards/authguard';


const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'landing-menu',
    loadChildren: () => import('./modules/landing/landing.module').then(m => m. LandingModule), canActivate: [AuthGuard]
  },
  {
    path: 'MasterData',
    loadChildren: () => import('./Modules/accounts/accounts.module').then(m => m.AccountsModule), canActivate: [AuthGuard]
  },
  {
    path: 'Assessment',
    loadChildren: () => import('./Modules/assessment/assessment.module').then(m => m.AssessmentModule), //canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// //import { AuthManager } from './helpers/auth-manager';


// const appRoutes: Routes = [
//   {
//     path: '',
//     loadChildren: () => import('./modules/accounts/accounts.module').then(m => m.AccountsModule)
//   },
//   {
//     path: 'account',
//     loadChildren: () => import('./Modules/accounts/accounts.module').then(m => m.AccountsModule), //canActivate: [AuthManager]
//   },
//   {
//     path: '**',
//     redirectTo: '',
//     pathMatch: 'full'
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(appRoutes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }



