import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { catchError, map, of } from 'rxjs';
import { LoginService } from '../services/login.service';

export class CustomValidators {
  constructor() {}

  static controlMatches(control: AbstractControl): ValidatorFn {
    return (matchingControl: AbstractControl) =>
      control.value != matchingControl.value ? { doesNotMatch: true } : null;
  }

  static userExistsValidator(loginService: LoginService): AsyncValidatorFn {
    return (userControl: AbstractControl) =>
      loginService.checkUserExists(userControl.value).pipe(
        catchError((err) => {
          return of(err);
        }),
        map((response) =>
          response.status == 200 ? { userExists: true } : null
        )
      );
  }
}
