import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Firebase } from '../../services/firebase';

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

  constructor(
    private firebase: Firebase
  ) {}

  username: string = '';
  password: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  registrationSuccessful: boolean = false;

  async register() {

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

      console.log(
        'USER WIRD GESPEICHERT:',
        username
      );    

      const users =
        await this.firebase
          .getUsers();

      console.log(
        'USERS AUS FIREBASE:',
        users
      );


    const userExists =
      users.some(

        (user: any) =>

          user.username
            .toLowerCase() ===
          username.toLowerCase()

      );

    if (userExists) {

      this.errorMessage =
        'Dieser Benutzername ist bereits vergeben.';

      return;
    }

    await this.firebase
      .addUser({

        username:
          username,

        password:
          this.password

      });

    
    this.errorMessage = '';

    this.successMessage =
      'Registrierung erfolgreich!';

    this.registrationSuccessful = true;

    
    this.username = '';
    this.password = '';
  }
}