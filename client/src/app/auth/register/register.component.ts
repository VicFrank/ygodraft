import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/_shared/auth.service';

const passwordsMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value
    ? { passwordsDontMatch: true }
    : null;
};

const uniqueUsernameValidator = (
  authService: AuthService
): AsyncValidatorFn => {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return authService.isUsernameTaken(control.value).pipe(
      map((isUsernameTaken: boolean) => {
        return isUsernameTaken ? { usernameTaken: true } : null;
      })
    );
  };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  newUserForm: UntypedFormGroup;

  constructor(private router: Router, private authService: AuthService) {
    this.newUserForm = new UntypedFormGroup(
      {
        username: new UntypedFormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        password: new UntypedFormControl('', Validators.required),
        confirmPassword: new UntypedFormControl(
          '',
          [Validators.required],
          uniqueUsernameValidator(this.authService)
        ),
      },
      { validators: [passwordsMatchValidator], updateOn: 'blur' }
    );
  }

  get username() {
    return this.newUserForm.get('username');
  }
  get password() {
    return this.newUserForm.get('password');
  }
  get confirmPassword() {
    return this.newUserForm.get('confirmPassword');
  }

  createAccount() {
    // this.authService
    //   .createAccount(this.username?.value, this.password?.value)
    //   .subscribe((res) => {
    //     // handle account creation
    //     this.router.navigate([`/`]);
    //   });
  }
}
