import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/modules/material.module';
import { FormsModule } from '@angular/forms';
import { AuthenticationGuardService } from './authentication/authentication-guard.service';
import { AuthenticationService } from './authentication/authentication.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [AuthenticationGuardService, AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
