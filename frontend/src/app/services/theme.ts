import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Theme {

  isDarkMode = true;

  constructor() {

    const savedTheme =
      localStorage.getItem(
        'theme'
      );

    this.isDarkMode =
      savedTheme !== 'light';

    this.applyTheme();
  }

  toggleTheme() {

    this.isDarkMode =
      !this.isDarkMode;

    localStorage.setItem(
      'theme',
      this.isDarkMode
        ? 'dark'
        : 'light'
    );

    this.applyTheme();
  }

  private applyTheme() {

    if (this.isDarkMode) {

      document.body.classList.remove(
        'light-mode'
      );

    } else {

      document.body.classList.add(
        'light-mode'
      );

    }

  }

}