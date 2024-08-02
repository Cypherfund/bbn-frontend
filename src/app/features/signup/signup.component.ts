import {AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Signup} from "../../models/signup";
import {UserService} from "../../services/user/user.service";
import {Subscription} from "rxjs";
import {
  emailTakenValidator,
  phoneNumberTakenValidator,
  usernameTakenValidator
} from "../../validators/unique-validators";
import {passwordMatchValidator} from "../../validators/password-match.validator";
import {logFormErrors} from "../../utils/form-error-logger";
import {LoaderService} from "../../services/loader.service";
import {MatButton} from "@angular/material/button";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements AfterViewInit, OnDestroy{
  registrationForm!: FormGroup;
  private subscriptions: Subscription[] = [];

  @ViewChild('button', { static: true }) button!: MatButton;

  countries = [
    { name: 'Cameroon', code: '+237', flag: 'assets/flag-cm.png', short: 'CM' },
    { name: 'United States', code: '+1', flag: 'assets/flag-us.png', short: 'US' },
    { name: 'United Kingdom', code: '+44', flag: 'assets/flag-uk.png', short: 'GB' },
    // Add more countries as needed
  ];
  errorMsg!: string;
  constructor(private fb: FormBuilder,
              private loaderService: LoaderService,
              private renderer: Renderer2,
              private readonly userService: UserService) {
    this.registrationForm = this.fb.group(
      {
              fullName: ['', [Validators.required]],
              userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)], [usernameTakenValidator(this.userService)]],
              email: ['', [Validators.required, Validators.email], [emailTakenValidator(this.userService)]],
              countryCode: ['+237', [Validators.required]],
              phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)], [phoneNumberTakenValidator(this.userService)]],
              password: ['', [Validators.required, Validators.minLength(6)]],
              repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
              agreeTerms: [false, [Validators.requiredTrue]]
            },
      { validators: passwordMatchValidator() });
  }

  onSubmit() {
    this.registrationForm.markAllAsTouched();
    this.errorMsg = '';
    this.registrationForm.get('phoneNumber')?.updateValueAndValidity();
    this.registrationForm.get('userName')?.updateValueAndValidity();
    this.registrationForm.get('email')?.updateValueAndValidity();
    console.log(this.registrationForm.status);

    const statusChanges$ = this.registrationForm.statusChanges;
    this.loaderService.showLoaderUntilComplete(statusChanges$).subscribe(status => {
      if (status === 'VALID' && this.registrationForm.valid) {
        this.registerUser();
      } else {
        logFormErrors(this.registrationForm);

        this.validateAllFormFields(this.registrationForm);
      }
    });
  }

  private printvalidityOfFields() {
    console.log(" username valid: ", this.registrationForm.get('userName')?.valid);
    console.log(" email valid: ", this.registrationForm.get('email')?.valid);
    console.log(" phone valid: ", this.registrationForm.get('phoneNumber')?.valid);
    console.log(" password valid: ", this.registrationForm.get('password')?.valid);
    console.log(" repeat password valid: ", this.registrationForm.get('repeatPassword')?.valid);
    console.log(" agree terms valid: ", this.registrationForm.get('agreeTerms')?.valid);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }

  ngAfterViewInit() {
    const el = {...this.button._elementRef, tagName: 'BUTTON'}
    console.log(el);
  };


  triggerValidation(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.triggerValidation(control);
      } else {
        control?.updateValueAndValidity();
      }
    });
  }

  private registerUser() {
    const user: Signup = {
      name: this.registrationForm.value.fullName,
      username: this.registrationForm.value.userName,
      email: this.registrationForm.value.email,
      phone: this.registrationForm.value.countryCode + this.registrationForm.value.phoneNumber,
      password: this.registrationForm.value.password,
      roles: ['CUSTOMER']
    };
    const el = {...this.button._elementRef, tagName: 'BUTTON'}
    const registration$ = this.userService.registerUser(user)
      .pipe(
        catchError(error => this.errorMsg = error.error?.message)
      );
    const subscription = this.loaderService.showLoaderUntilComplete(registration$).subscribe();

    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
