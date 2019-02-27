import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { BaseForm } from 'src/app/core/classes/form.class';
import { ValidationService } from 'src/app/core/services/validation.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

import { LoginAuth } from 'src/app/core/models/authentication.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseForm implements OnInit {
  public returnUrl: string;

  constructor(
    public validationService: ValidationService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(false)
    });

    this.authenticationService.clearSession();

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  public onSubmit() {
    this.error = null;

    if (this.form.valid) {
      this.loading = true;

      this.authenticationService.login(this.form.value).subscribe(
        response => {
          this.router.navigate([this.returnUrl]);
        },
        err => {
          this.submitted = true;
          this.loading = false;

          switch (err.status) {
            case 404:
            case 401:
              this.form.controls.password.setErrors({ incorrectLoginDetails: true });
              this.form.controls.username.setErrors({ incorrectLoginDetails: true });
              this.error = 'Username or password in incorrect';
              break;
            default:
              console.error('Unknown Error', err);
          }
        }
      );
    } else {
      this.submitted = true;
    }
  }

  public get f(): any {
    return this.form.controls;
  }
}
