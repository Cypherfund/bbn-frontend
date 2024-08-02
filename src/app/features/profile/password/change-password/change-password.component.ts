import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {DialogElementsExampleDialog} from "../../../account/payment-sheet/payment-sheet.component";
import {MatDialog, MatDialogActions, MatDialogClose} from "@angular/material/dialog";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  resetPasswordForm: FormGroup;
  readonly dialog = inject(MatDialog);
  constructor(private fb: FormBuilder) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup): null | object {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      // Handle the reset password logic
      this.openDialog();
      console.log('Password reset successfully', this.resetPasswordForm.value);
    }
  }

  openDialog() {
    this.dialog.open(PassworResetModalComponent);
  }
}

//create a component for password reset success
@Component({
  selector: 'dialog-elements-example-dialog',
  template: `
    <div class="password-reset-container">
      <div class="card">
        <div class="icon-container">
          <mat-icon>check_circle</mat-icon>
        </div>
        <h2>Password Reset!</h2>
        <p>Your password has been successfully reset, click below to continue your access.</p>
        <button mat-raised-button color="primary" routerLink="/login" mat-dialog-close>
          Continue
        </button>
        <a routerLink="/login" class="return-link" mat-dialog-close>← Return to the login screen</a>
      </div>
    </div>

  `,
  styleUrl: './change-password.component.scss',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterLink, MatDialogActions, MatDialogClose],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassworResetModalComponent {}
