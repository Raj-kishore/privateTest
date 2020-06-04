import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '../app/app.material.module'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountsModule } from '../app/modules/accounts/accounts.module';
import { LoginModule } from '../app/modules/login/login.module';
import { LandingModule } from '../app/modules/landing/landing.module';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/layout/header/header.component';
import {MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { AssessmentModule } from './Modules/assessment/assessment.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AccountsModule,
    LoginModule,
    LandingModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,ReactiveFormsModule,
    MatMenuModule,
    AssessmentModule,
    MatCheckboxModule
  ],
  providers: [FormBuilder,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
