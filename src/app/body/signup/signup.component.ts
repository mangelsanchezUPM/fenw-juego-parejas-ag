import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  MaxLengthValidator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user.model';
import { LoginService } from 'src/app/shared/services/login.service';
import { RestClientService } from 'src/app/shared/services/rest-client.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(8),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
    ]),
    repeatPassword: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    private loginService: LoginService,
    private restClient: RestClientService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {}

  signup() {
    const user = new User(
      this.signupForm.get('username')?.value,
      this.signupForm.get('password')?.value,
      this.signupForm.get('email')?.value
    );

    this.restClient.signupUser(user).subscribe(
      (response) => {
        this.signupForm.reset();
        this.toastService.success(
          `Usuario ${user.username} registrado con éxito`,
          'Registrado con éxito'
        );
      },
      (err) => this.toastService.error(err.error, 'Error en el registro')
    );
  }
}
