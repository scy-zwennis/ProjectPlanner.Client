import { FormGroup, AbstractControl } from '@angular/forms';
import { OnInit } from '@angular/core';

import * as $ from 'jquery';

export class BaseForm implements OnInit {
  public errorMessages: { [key: string]: { [key: string]: string | string[] } } = {};

  public form: FormGroup;

  public submitted = false;
  public loading = false;

  public error: string;

  ngOnInit() {
    const self = this;

    $(() => {
      $('[data-floating]').each(function() {
        const id = $(this).attr('id');

        if ($(this).val()) {
          self.setFloating(id, true);
        }

        $(this).on({
          focus: () => {
            self.setFloating(id, true);
          },
          blur: () => {
            if (!$(this).val()) {
              self.setFloating(id, false);
            }
          },
          change: () => {
            self.setFloating(id, !!$(this).val());
          }
        });
      });
    });
  }

  public displayErrors(control: AbstractControl, name?: string): string[] {
    const customMessages = this.errorMessages[name];
    let errors = [];

    for (const error in control.errors) {
      if (control.errors[error]) {
        const fullError = control.errors[error];

        if (customMessages && customMessages[error]) {
          const message = customMessages[error];

          if (message.constructor === Array) {
            errors = errors.concat(message);
          } else {
            errors.push(message);
          }
        } else {
          switch (error) {
            case 'required':
              errors.push(`${name} is required`);
              break;
            case 'minlength':
              errors.push(`${name} must be ${fullError.requiredLength} characters or more`);
              break;
            case 'incorrectLoginDetails':
              errors.push('Username or password is incorrect');
              break;
            case 'email':
              errors.push('Email is not valid');
              break;
            case 'notSame':
              errors.push('Passwords do not match');
              break;
            case 'uniqueIndex':
              errors.push(fullError);
              break;
            default:
              console.error('Unhandled error', error, fullError);
          }
        }
      }
    }

    return errors;
  }

  public tooltipColor(control: AbstractControl, display = this.submitted) {
    if (display && !control.valid) {
      return 'input-invalid';
    }

    return 'input-neutral';
  }

  public showTooltip(control: AbstractControl, display = this.submitted) {
    return !control.valid && display;
  }

  public get f(): any {
    return this.form.controls;
  }

  private setFloating(id: string, float: boolean) {
    $(`[for=${id}]`).each(function() {
      if (float) {
        $(this).addClass('floating-placeholder');
      } else {
        $(this).removeClass('floating-placeholder');
      }
    });
  }
}
