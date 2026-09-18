import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Firebase } from '../../services/firebase';

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

  constructor(private router: Router, private firebase: Firebase) {}

  username = '';
  password = '';
  errorMessage = '';
  isLoggedIn = false;

  async login() {

    // Felder prüfen
    if (
      this.username.trim() === '' ||
      this.password.trim() === ''
    ) {

      this.errorMessage =
        'Bitte alle Felder ausfüllen!';

      return;
    }

    const users =
      await this.firebase
        .getUsers();

    console.log(
      'USERS:',
      users
    );

    const user =
      users.find(
        (user: any) =>

          user.username
            .toLowerCase() ===
          this.username
            .trim()
            .toLowerCase()

          &&

          user.password ===
          this.password
      );

    // Benutzer gefunden
    if (user) {

      localStorage.setItem(
        'currentUser',
        user.username
      );
      localStorage.setItem(
        'currentUserId',
        user.id
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