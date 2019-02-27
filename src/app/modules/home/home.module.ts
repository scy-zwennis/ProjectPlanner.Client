import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeRoutingModule } from './home.routing';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeRoutingModule,
    DashboardComponent
  ]
})
export class HomeModule { }
