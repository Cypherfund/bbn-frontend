import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {Signup} from "../../models/signup";


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule
  ]
})
export class SignupModule {
  signupForm!: FormGroup;
  verificationCode!: string;
  private spinner!: boolean;
  stage = 'signup';
  private subscriptions: Subscription[] = []
  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      lastName: [''],
      firstName: ['']
    });
    this.subscriptions.push(this.userService.login$.subscribe(loginVal => {
      if(loginVal === 1)
        this.userService.navigateToHome();
    }));
  }

  submitForm() {
    if (this.signupForm.valid) {
      this.spinner = true
      const user: Signup = {
        name: this.signupForm.value.firstName + ' ' + this.signupForm.value.lastName,
        username: this.signupForm.value.firstName,
        email: this.signupForm.value.email,
        phone: '',
        password: this.signupForm.value.password,
        roles: ['CUSTOMER']
      };
      const subscription = this.userService.registerUser(user).subscribe();

      subscription.add(() => (this.spinner = false));

      this.subscriptions.push(subscription);
    }

  }

  onSubmitCodeVerification() {
    if (this.verificationCode) {
      // Call a service to verify the code
      this.verifyCode(this.verificationCode);
    }
  }

  verifyCode(code: string) {
    // Implement the logic to verify the code
    // For example, call an API endpoint to verify the code
    console.log('Verifying code:', code);
    // Simulate verification success
    alert('Code verified successfully!');
  }

  resendCode() {
    // Implement the logic to resend the verification code
    // For example, call an API endpoint to resend the code
    console.log('Resending code');
    // Simulate resending success
    alert('Verification code resent!');
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
