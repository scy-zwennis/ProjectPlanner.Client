import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  { path: '', component: SignupComponent, data: { title: 'Sign Up | Project Planner' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule {}
