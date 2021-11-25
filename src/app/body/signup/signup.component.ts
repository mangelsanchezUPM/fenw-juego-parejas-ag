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
      this.repeatedPasswordValidation,
    ]),
    repeatPassword: new FormControl('', [
      Validators.required,
      this.repeatedPasswordValidation,
    ]),
  });

  constructor(
    private loginService: LoginService,
    private restClient: RestClientService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {}

  repeatedPasswordValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (
        this.signupForm.get('password')?.value ==
        this.signupForm.get('repeatedPassword')?.value
      ) {
        return { repeated: true };
      }
      return null;
    };
  }

  signup() {
    const username: string = this.signupForm.get('username')?.value;
    const email: string = this.signupForm.get('email')?.value;
    const password: string = this.signupForm.get('password')?.value;

    this.restClient.signupUser(username, email, password).subscribe(
      (response) => {
        this.signupForm.reset();
        this.toastService.success(
          `Usuario ${username} registrado con éxito`,
          'Registrado con éxito',
        );
      },
      (err) => this.toastService.error(err.error, 'Error en el registro')
    );
  }
}
