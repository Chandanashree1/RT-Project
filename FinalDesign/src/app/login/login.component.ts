// 
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';

  usernameError = '';
  passwordError = '';

  constructor(private router: Router, private http: HttpClient) { }

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
    const body = new URLSearchParams();
  body.set('username', this.username);
  body.set('password', this.password);
  body.set('client_id', 'client-id');
  body.set('client_secret', 'client-secret');
  body.set('grant_type', 'password'); // or client_credentials

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  this.http.post<any>('http://localhost:3000/oauth/token', body.toString(), { headers }).subscribe({
      next: (res) => {
        if (res.accessToken) {
          localStorage.setItem('auth', 'true');
          sessionStorage.setItem('accessToken', res.accessToken);
          this.router.navigate(['/dashboard']);
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        console.error(err);
        alert(err.message)
      }
    });


  }
}
