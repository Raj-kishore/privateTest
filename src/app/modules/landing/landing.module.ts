import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingMenuComponent } from './components/landing-menu/landing-menu.component';
import { LandingLayoutComponent } from './layout/landing-layout.component';
import{ FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LandingMenuComponent, LandingLayoutComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class LandingModule { }
