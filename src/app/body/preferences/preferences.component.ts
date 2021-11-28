import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css'],
})
export class PreferencesComponent {
  cardsNumberList: number[] = [20, 26, 32];
  timeLimitList: number[] = [0, 60, 90, 120, 150];
  preferencesForm = new FormGroup({
    cardsNumber: new FormControl(this.cardsNumberList[0], [
      Validators.required,
    ]),
    timeLimit: new FormControl(this.timeLimitList[0], [Validators.required]),
  });

  constructor(private router: Router) {}

  savePreferences() {
    const cardsNumber = this.preferencesForm.get('cardsNumber')?.value;
    const timeLimit = this.preferencesForm.get('timeLimit')?.value;
    if (this.preferencesForm.valid) {
      localStorage.setItem(environment.cardsNumber, cardsNumber);
      localStorage.setItem(environment.timeLimit, timeLimit);
    }
    this.router.navigateByUrl('/play');
  }
}
