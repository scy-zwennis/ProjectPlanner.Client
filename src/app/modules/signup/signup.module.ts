import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { SignUpRoutingModule } from './signup.routing';

// Components
import { SignupComponent } from './pages/signup/signup.component';
import { RouterModule } from '@angular/router';
import { SignupService } from './services/signup.service';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [SignUpRoutingModule],
  providers: [SignupService]
})
export class SignupModule {}
