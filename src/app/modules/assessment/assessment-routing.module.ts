import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentLayoutComponent } from './layout/assessment-layout.component';


const secondaryRoutes: Routes = [
  { path: '', component: AssessmentLayoutComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(secondaryRoutes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule { }
