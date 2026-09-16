import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  username: string = '';
  password: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  registrationSuccessful: boolean = false;

  register(): void {

    const usernamePattern = /^[a-zA-Z0-9]+$/;

    if (!usernamePattern.test(this.username.trim())) {

      this.errorMessage =
        'Benutzername darf nur Buchstaben und Zahlen enthalten.';

      return;
    }

    if (this.password.length < 8) {

      this.errorMessage =
        'Passwort muss mindestens 8 Zeichen lang sein.';

      return;
    }

    const specialCharacters =
      this.password.match(/[^a-zA-Z0-9]/g);

    const specialCount =
      specialCharacters
        ? specialCharacters.length
        : 0;

    if (specialCount < 2) {

      this.errorMessage =
        'Passwort muss mindestens 2 Sonderzeichen enthalten.';

      return;
    }

    const username = this.username.trim();

    const savedUsers =
      localStorage.getItem('users');

    const users: User[] =
      savedUsers
        ? JSON.parse(savedUsers)
        : [];

    const userExists =
      users.some(
        user => user.username.toLowerCase() === username.toLowerCase()
      );

    if (userExists) {

      this.errorMessage =
        'Dieser Benutzername ist bereits vergeben.';

      return;
    }

    users.push({
      username: username,
      password: this.password
    });

    localStorage.setItem(
      'users',
      JSON.stringify(users)
    );

    
    this.errorMessage = '';

    this.successMessage =
      'Registrierung erfolgreich!';

    this.registrationSuccessful = true;

    
    this.username = '';
    this.password = '';
  }
}