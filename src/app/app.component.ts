import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'JuegoParejas';

  ngOnInit() {
    localStorage.setItem('cards-number', '20');
    localStorage.setItem('time-limit', '0');
  }
}
