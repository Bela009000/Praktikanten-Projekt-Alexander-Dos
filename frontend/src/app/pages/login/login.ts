import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  constructor(private router: Router) {}

  username = '';
  password = '';
  errorMessage = '';
  isLoggedIn = false;

  login(): void {
    if (this.username.trim() === '' || this.password.trim() === '') {
      this.errorMessage = 'Bitte alle Felder ausfüllen!';
      return;
    }

    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    if (this.username === savedUsername && this.password === savedPassword) {
      this.errorMessage = '';
      this.isLoggedIn = true;
      this.router.navigate(['/dashboard']);
      return;
    }

    this.errorMessage = 'Benutzername oder Passwort falsch!';
    this.password = '';
  }

  logout(): void {
    this.isLoggedIn = false;
    this.username = '';
    this.password = '';
    this.errorMessage = '';
    this.router.navigate(['/login']);
  }
}