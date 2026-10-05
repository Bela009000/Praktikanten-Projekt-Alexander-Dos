import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Theme } from './services/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(
    public theme: Theme,
    public router: Router
  ) {}

  get showThemeSwitch(): boolean {

    return (
      this.router.url !== '/login' &&
      this.router.url !== '/register'
    );

  }
}