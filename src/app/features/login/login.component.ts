import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {Subscription} from "rxjs";
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formGroup!: FormGroup;
  subscriptions: Subscription[] = [];

  errorMsg!: string;
  constructor(private fb: FormBuilder,
              private loaderService: LoaderService,
              private userService: UserService) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.subscriptions.push(this.userService.login$.subscribe(loginVal => {
      if(loginVal === 1)
        this.userService.navigateToHome();
    }));
  }

  submitForm() {
    if (this.formGroup.valid) {

      const loginproccess$ = this.userService.loginUser({
        usernameOrEmailOrPhone: this.formGroup.value.email,
        password: this.formGroup.value.password
      });

      const subscription = this.loaderService.showLoaderUntilComplete(loginproccess$).subscribe();

      this.subscriptions.push(subscription);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
