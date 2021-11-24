import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule} from "ngx-toastr";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './body/home/home.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { PreferencesComponent } from './body/preferences/preferences.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayComponent } from './body/play/play.component';
import { RestClientService } from './shared/services/rest-client.service';
import { RecordsComponent } from './body/records/records.component';
import { LoginComponent } from './body/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    PreferencesComponent,
    PlayComponent,
    RecordsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      'timeOut': 2000,
      'closeButton': true,
      'tapToDismiss': true,
      'countDuplicates': true,
      'positionClass': 'toast-top-right'
    }),
  ],
  providers: [RestClientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
