import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LocalStorageModule.forRoot({
      storageType: 'localStorage',
    }),
    BrowserAnimationsModule,

    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
