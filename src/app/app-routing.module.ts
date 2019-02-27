import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuard } from './core/guards/auth.guard';

// Modules
import { LoginModule } from './modules/login/login.module';
import { HomeModule } from './modules/home/home.module';
import { SignupModule } from './modules/signup/signup.module';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], loadChildren: () => HomeModule },
  { path: 'login', loadChildren: () => LoginModule },
  { path: 'signup', loadChildren: () => SignupModule },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
