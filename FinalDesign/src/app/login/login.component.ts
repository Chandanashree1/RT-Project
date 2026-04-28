// 
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';

  usernameError = '';
  passwordError = '';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    this.usernameError = '';
    this.passwordError = '';

    let isValid = true;

    // validation
    if (!this.username) {
      this.usernameError = 'Username is required';
      isValid = false;
    }

    if (!this.password) {
      this.passwordError = 'Password is required';
      isValid = false;
    }

    if (!isValid) return;

    // API CALL
    this.http.post<any>('http://localhost:3000/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        if (res.success) {
          localStorage.setItem('auth', 'true');
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid username or password');
        }
      },
      error: (err) => {
        console.error(err);
        alert('Server error');
      }
    });
  }
}
