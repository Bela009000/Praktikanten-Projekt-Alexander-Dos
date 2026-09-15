import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  register() {

  const usernamePattern = /^[a-zA-Z0-9]+$/;

  if (!usernamePattern.test(this.username)) {

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

  this.errorMessage = '';

  localStorage.setItem(
    'username',
    this.username
  );

  localStorage.setItem(
    'password',
    this.password
  );

  this.successMessage =
    'Registrierung erfolgreich!';

  this.registrationSuccessful = true;
}

}