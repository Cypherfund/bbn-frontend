import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formGroup!: FormGroup;
  inProgress: boolean = false
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder,
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

      this.inProgress = true;

      const subscription = this.userService.loginUser({
        usernameOrEmailOrPhone: this.formGroup.value.email,
        password: this.formGroup.value.password
      }).subscribe();

      subscription.add(() => (this.inProgress = false));

      this.subscriptions.push(subscription);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
