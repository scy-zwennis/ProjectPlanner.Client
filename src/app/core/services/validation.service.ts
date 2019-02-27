import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

export const USERNAME_PATTERN = '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() {}

  public checkPasswords(form: FormGroup) {
    const pass = form.controls.password.value;
    const confirm = form.controls.confirmPassword.value;

    if (pass === confirm) {
      form.controls.confirmPassword.setErrors(null);
    } else {
      form.controls.confirmPassword.setErrors({ notSame: true });
    }

    return null;
  }
}
