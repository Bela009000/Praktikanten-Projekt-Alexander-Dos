import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firebase } from '../../services/firebase';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent {

  username = '';
  password = '';
  profileImage = '';
  successMessage = '';
  errorMessage = '';
  showPassword = false;

  constructor(
    private firebase: Firebase,
    private cdr: ChangeDetectorRef,
    private theme: Theme,
    private router: Router
  ) {}

  async ngOnInit() {

    const userId =
      localStorage.getItem(
        'currentUserId'
      );

    if (!userId) {
      return;
    }

    const user: any =
      await this.firebase
      .getUserById(userId);

    if (!user) {
      return;
    }

    this.username =
      user.username || '';

    this.password =
      user.password || '';

    this.profileImage =
      user.profileImage || '';
    this.cdr.detectChanges();
  }

  async saveProfile() {

    this.successMessage = '';
    this.errorMessage = '';
    const userId =
      localStorage.getItem(
        'currentUserId'
      );

    if (!userId) {
      return;
    }
    const users =
      await this.firebase.getUsers();

    const userExists =
      users.some(
        (user: any) =>

          user.id !== userId &&

          user.username
            .toLowerCase() ===
          this.username
            .trim()
            .toLowerCase()
      );

    if (userExists) {

      this.errorMessage =
        'Dieser Benutzername ist bereits vergeben.';

      return;
    }

const usernamePattern =
  /^[a-zA-Z0-9]+$/;

if (
  !usernamePattern.test(
    this.username.trim()
  )
) {

  this.successMessage = '';

  this.errorMessage =
    'Benutzername darf nur Buchstaben und Zahlen enthalten.';

  return;
}

if (
  this.password.length < 8
) {

  this.successMessage = '';

  this.errorMessage =
    'Passwort muss mindestens 8 Zeichen lang sein.';

  return;
}

const specialCharacters =
  this.password.match(
    /[^a-zA-Z0-9]/g
  );

const specialCount =
  specialCharacters
    ? specialCharacters.length
    : 0;

if (
  specialCount < 2
) {

  this.successMessage = '';

  this.errorMessage =
    'Passwort muss mindestens 2 Sonderzeichen enthalten.';

  return;
}
    await this.firebase.updateUser(
      userId,
      {
        username: this.username.trim(),
        password: this.password,
        profileImage: this.profileImage
      }
    );

    localStorage.setItem(
      'currentUser',
      this.username.trim()
    );

    this.successMessage =
      'Profil erfolgreich gespeichert';

    setTimeout(() => {

      this.successMessage = '';

    }, 3000);
  }
  logout() {

    localStorage.removeItem(
      'currentUser'
    );

    localStorage.removeItem(
      'currentUserId'
    );

    localStorage.removeItem(
      'loginSuccess'
    );

    this.theme.setDarkMode();
    
    this.router.navigate([
      '/login'
    ]);
  }
}