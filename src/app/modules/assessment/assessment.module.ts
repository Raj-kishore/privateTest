import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import {  MatIconModule } from '@angular/material/icon'; 
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';

import { AssessmentRoutingModule } from './assessment-routing.module';
import { AssessmentDashboardComponent } from './components/assessment-dashboard/assessment-dashboard.component';
import { InitiateAssessmentComponent } from './components/initiate-assessment/initiate-assessment.component';
import { AssessmentLayoutComponent } from './layout/assessment-layout.component';


@NgModule({
  declarations: [AssessmentDashboardComponent, InitiateAssessmentComponent, AssessmentLayoutComponent],
  imports: [
    CommonModule,
    AssessmentRoutingModule,
    MatTableModule,
    HttpClientModule,
    MatTabsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule, 
    // MatButtonModule, 
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    FormsModule,  
    ReactiveFormsModule,
    CdkStepperModule,
    MatStepperModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [DatePipe]
})
export class AssessmentModule { }
