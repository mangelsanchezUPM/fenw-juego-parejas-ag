import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  username: string = '';
  constructor(public loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.username$.subscribe(
      (username) => (this.username = username)
    );
  }

  logout() {
    this.loginService.userLogout();
  }
}
