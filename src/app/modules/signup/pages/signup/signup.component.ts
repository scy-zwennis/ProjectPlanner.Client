import { Component, OnInit } from '@angular/core';
import { BaseForm } from 'src/app/core/classes/form.class';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService, USERNAME_PATTERN } from 'src/app/core/services/validation.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends BaseForm implements OnInit {
  errorMessages = {
    Username: {
      pattern: ['Username must be 8 to 20 characters', 'Username may not start with _ or .']
    }
  };

  constructor(
    private validationService: ValidationService,
    private authenticationService: AuthenticationService,
    private signUpService: SignupService
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.form = new FormGroup(
      {
        username: new FormControl('', [Validators.required, Validators.pattern(USERNAME_PATTERN)]),
        emailAddress: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('')
      },
      { validators: this.validationService.checkPasswords }
    );

    this.authenticationService.clearSession();
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      this.signUpService.register(this.form.value).subscribe(
        response => {
          console.log(response);
        },
        err => {
          const error = err && err.error;
          if (error && error.type === 'uniqueIndex') {
            const msg = {};
            msg[error.type] = error.message;

            this.form.controls[this.camelize(error.field)].setErrors(msg);
          } else {
            console.log(error);
          }
        }
      );
    }
  }

  camelize(str: string) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, '');
  }
}
