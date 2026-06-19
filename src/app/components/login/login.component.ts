import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
password = '';
errorMessage = '';

constructor(private router: Router) {}

login() {

  if (
    this.email === 'admin@gmail.com' &&
    this.password === 'admin123'
  ) {

    localStorage.setItem(
      'isLoggedIn',
      'true'
    );

    this.router.navigate(['/dashboard']);

  } else {

    this.errorMessage =
      'Invalid Email or Password';
  }
}

}
