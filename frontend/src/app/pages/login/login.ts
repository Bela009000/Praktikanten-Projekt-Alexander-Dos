import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
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

    // Felder prüfen
    if (
      this.username.trim() === '' ||
      this.password.trim() === ''
    ) {

      this.errorMessage =
        'Bitte alle Felder ausfüllen!';

      return;
    }

    // Gespeicherte Benutzer holen
    const savedUsers =
      localStorage.getItem('users');

    const users: User[] =
      savedUsers
        ? JSON.parse(savedUsers)
        : [];

    // Benutzer suchen
    const user =
      users.find(
        user =>
          user.username.toLowerCase() ===
          this.username.trim().toLowerCase()
          &&
          user.password === this.password
      );

    // Benutzer gefunden
    if (user) {

      localStorage.setItem(
        'currentUser',
        user.username
      );

      localStorage.setItem(
        'CurrentUser',
        user.username
      );

      localStorage.setItem(
        'loginSuccess',
        'true'
      );

      this.errorMessage = '';

      this.isLoggedIn = true;

      this.router.navigate([
        '/dashboard'
      ]);

      return;
    }

    // Kein Benutzer gefunden
    this.errorMessage =
      'Benutzername oder Passwort falsch!';

    this.password = '';
  }

  logout(): void {

    this.isLoggedIn = false;

    this.username = '';
    this.password = '';
    this.errorMessage = '';

    localStorage.removeItem(
      'loginSuccess'
    );

    localStorage.removeItem(
      'currentUser'
    );

    localStorage.removeItem(
      'CurrentUser'
    );

    this.router.navigate([
      '/login'
    ]);
  }
}