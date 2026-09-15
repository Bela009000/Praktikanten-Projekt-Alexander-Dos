import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoggedIn: boolean = false;

  login() {

  if (this.username === '' || this.password === '') {
    this.errorMessage = 'Bitte alle Felder ausfüllen!';
    return;
  }

  const savedUsername = localStorage.getItem('username');
  const savedPassword = localStorage.getItem('password');

  if (
    this.username === savedUsername &&
    this.password === savedPassword
  ) {
    this.errorMessage = '';
    this.isLoggedIn = true;
  }
  else {
    this.errorMessage = 'Benutzername oder Passwort falsch!';
  }
}

  logout() {
    this.isLoggedIn = false;
    this.username = '';
    this.password = '';
    this.errorMessage = '';
  }
}