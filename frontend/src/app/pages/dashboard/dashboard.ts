import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {

  successMessage: string = '';

  constructor(private router: Router) {

    const loginSuccess =
      localStorage.getItem('loginSuccess');

    if (loginSuccess) {

      this.successMessage =
        '✅ Login erfolgreich!';

      localStorage.removeItem('loginSuccess');
    }
  }

  logout() {

    this.router.navigate(['/login']);

  }
}

