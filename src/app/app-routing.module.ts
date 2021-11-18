import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './body/home/home.component';
import { PlayComponent } from './body/play/play.component';
import { PreferencesComponent } from './body/preferences/preferences.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'play', component: PlayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
