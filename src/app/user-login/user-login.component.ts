import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiKeyService } from '../../services/api-key.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { UserDto } from '../../models/UserDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  userForm: FormGroup;

  constructor(private keyService: ApiKeyService
    , private authService: AuthService
    , private builder: FormBuilder
    , private router: Router) {
    this.userForm = this.builder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onSubmit() {
    const email = this.userForm.get('email')?.value as string
    const password = this.userForm.get('password')?.value as string
    const userObj = new UserDto(email, password)

    this.authService.logIn(userObj).subscribe(
      data => {
        this.keyService.storeKey(data);
        this.router.navigate(['/']).then(() => alert('Succesfully logged'))
      }
      , (error) => alert('Error logging in, try again')
      , () => console.log('complete'));
  }
}
