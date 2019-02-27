import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';

// Core Components
import { AppComponent } from '../app.component';

// Core Modules
import { LoginModule } from '../modules/login/login.module';
import { SignupModule } from '../modules/signup/signup.module';
import { HomeModule } from '../modules/home/home.module';

// Core Services
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
    SignupModule,
    HomeModule
  ],
  providers: [
    AuthenticationService
  ]
})
export class CoreModule { }
