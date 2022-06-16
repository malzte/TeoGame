import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NewlistingComponent } from './components/newlisting/newlisting.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [AppComponent,MyprofileComponent, LoginComponent, RegisterComponent, ListingsComponent, NewlistingComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,FormsModule, ReactiveFormsModule,Ng2SearchPipeModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
