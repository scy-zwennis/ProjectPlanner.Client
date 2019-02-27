import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Core Module
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [],
  imports: [
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
