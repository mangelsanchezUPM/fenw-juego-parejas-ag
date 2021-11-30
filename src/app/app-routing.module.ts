import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './body/home/home.component';
import { LoginComponent } from './body/login/login.component';
import { PlayComponent } from './body/play/play.component';
import { PreferencesComponent } from './body/preferences/preferences.component';
import { RecordsComponent } from './body/records/records.component';
import { SignupComponent } from './body/signup/signup.component';
import { LoggedGuard } from './shared/guards/logged.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'play', component: PlayComponent },
  { path: 'records', component: RecordsComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoggedGuard] },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
