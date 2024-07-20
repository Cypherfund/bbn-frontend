import { Component } from '@angular/core';
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

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  registrationForm!: FormGroup;
  private spinner!: boolean;
  private subscriptions: Subscription[] = [];

  countries = [
    { name: 'Cameroon', code: '+237', flag: 'assets/flag-cm.png', short: 'CM' },
    { name: 'United States', code: '+1', flag: 'assets/flag-us.png', short: 'US' },
    { name: 'United Kingdom', code: '+44', flag: 'assets/flag-uk.png', short: 'GB' },
    // Add more countries as needed
  ];
  constructor(private fb: FormBuilder,
              private readonly userService: UserService) {
    this.registrationForm = this.fb.group(
      {
              fullName: ['', [Validators.required]],
              userName: ['', [Validators.required], [usernameTakenValidator(this.userService)]],
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
    if (this.registrationForm.valid) {
        this.registerUser();
    } else {
      console.log(this.registrationForm)
      logFormErrors(this.registrationForm);

      this.validateAllFormFields(this.registrationForm);
    }
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

  private registerUser() {
    console.log('form is valid');
    this.spinner = true
    const user: Signup = {
      name: this.registrationForm.value.fullName,
      username: this.registrationForm.value.firstName,
      email: this.registrationForm.value.email,
      phone: this.registrationForm.value.countryCode + this.registrationForm.value.phoneNumber,
      password: this.registrationForm.value.password,
      roles: ['CUSTOMER']
    };
    const subscription = this.userService.registerUser(user).subscribe();

    subscription.add(() => (this.spinner = false));

    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
