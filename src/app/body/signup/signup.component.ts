import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user.model';
import { LoginService } from 'src/app/shared/services/login.service';
import { RestClientService } from 'src/app/shared/services/rest-client.service';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  passwordControl: AbstractControl = new FormControl('', [Validators.required]);
  signupForm: FormGroup = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(8)],
      asyncValidators: [
        CustomValidators.userExistsValidator(this.loginService),
      ],
      updateOn: 'blur',
    }),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: this.passwordControl,
    matchPassword: new FormControl('', [
      Validators.required,
      CustomValidators.controlMatches(this.passwordControl),
    ]),
  });

  constructor(
    private loginService: LoginService,
    private restClient: RestClientService,
    private toastService: ToastrService
  ) {}

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
