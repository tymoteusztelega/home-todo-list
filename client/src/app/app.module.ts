import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/modules/material.module';
import { combinedReducers } from './shared/helpers/combine-reducers';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuardService } from './authentication/authentication-guard.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(combinedReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [AuthenticationGuardService, AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
