import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { LoginRoutingModule } from './login.routing';
import { RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    LoginRoutingModule,
    LoginComponent
  ]
})
export class LoginModule { }
