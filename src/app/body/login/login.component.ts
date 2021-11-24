import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestClientService } from 'src/app/shared/services/rest-client.service';

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
    private clientRest: RestClientService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  login() {
    this.clientRest
      .userLogin(
        this.loginForm.get('username')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe(
        (response) => {
          this.clientRest.authToken =
            response.headers.get('authorization') || '';
          this.clientRest.username = this.loginForm.get('username')?.value;
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
