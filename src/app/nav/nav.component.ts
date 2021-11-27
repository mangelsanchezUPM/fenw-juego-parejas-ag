import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  username: string = '';
  constructor(
    public loginService: LoginService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginService.username$.subscribe((username) => {
      this.username = username;
      const toastTitle = username ? `Inicio de sesión` : `Cierre de sesión`;
      const toastMessage = username
        ? `Ha iniciado sesión como usuario ${username}`
        : `Se ha cerrado la sesión con éxito cerrado sesión`;
      this.toastService.success(toastMessage, toastTitle);
    });
  }

  logout() {
    this.loginService.userLogout();
  }
}
