import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit{
  editProfileForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService) {
    this.editProfileForm = this.fb.group({
      name: [this.userService.user.name, [Validators.required]],
      username: [this.userService.user.username, [Validators.required]],
      email: [this.userService.user.email, [Validators.required, Validators.email]],
      phone: [this.userService.user.phone, [Validators.required]]
    });

    this.userService.login$.subscribe(loggedIn => {
      if (loggedIn) {
        this.editProfileForm.patchValue(this.userService.user);
      }
    });
  }

  ngOnInit(): void {
  }

  onSave(): void {
    if (this.editProfileForm.valid) {
      // Perform save operation
      console.log('Profile saved', this.editProfileForm.value);
    }
  }
}
