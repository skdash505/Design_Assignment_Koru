import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Angular material module
import { AngularMaterialModule} from './angularMaterial/angular-material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


import { AppComponent } from './app.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { DataFormComponent } from './data-form/data-form.component';
import { CeateDateScheduleComponent } from './ceate-date-schedule/ceate-date-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogContentComponent,
    DataFormComponent,
    CeateDateScheduleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    AppRoutingModule,

    AngularMaterialModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
