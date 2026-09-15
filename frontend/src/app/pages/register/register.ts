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
  registrationSuccessful: boolean = false;

  register() {

  localStorage.setItem(
    'username',
    this.username
  );

  localStorage.setItem(
    'password',
    this.password
  );

  this.successMessage =
    'Registrierung erfolgreich! Du kannst dich jetzt anmelden.';

  this.registrationSuccessful = true;
}

}