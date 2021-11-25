import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  login() {
    this.loginService
      .userLogin(
        this.loginForm.get('username')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe(
        (response) => {
          const authToken = response.headers.get('authorization') || '';
          const username = this.loginForm.get('username')?.value;
          this.loginService.loginSuccess(username, authToken);
          this.router.navigateByUrl('home');
        },
        (err) => {
          this.toastService.error(
            'Combinación de usuario y contraseña incorrectos',
            'Error al iniciar sesión'
          );
        }
      );
  }
}
