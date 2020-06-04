import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountDashboardComponent } from './components/account-dashboard/account-dashboard.component';
import { AccountAddComponent } from './components/account-add/account-add.component';
import { AccountEditComponent } from './components/account-edit/account-edit.component';
import { AccountDeleteComponent } from './components/account-delete/account-delete.component';
import { AccountLayoutComponent } from './layout/account-layout.component';
import {MatTabsModule} from '@angular/material/tabs';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';
import {MatSelectModule} from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';


// import {MatButtonModule} from '@angular/material/button';
import {  MatIconModule } from '@angular/material/icon'; 
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ AccountDashboardComponent, AccountAddComponent, AccountEditComponent, AccountDeleteComponent, AccountLayoutComponent, UserDashboardComponent, UserAddComponent, UserEditComponent, UserDeleteComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
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
    MatCheckboxModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [DatePipe]
})
export class AccountsModule { }
