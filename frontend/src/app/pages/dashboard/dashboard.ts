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

  topicCount: number = 0;

  flashcardCount: number = 0;

  quizSuccess: number = 0;

  successMessage: string = '';

  constructor(private router: Router) {

    const currentUser =
      localStorage.getItem('currentUser');

    const savedTopics =
      localStorage.getItem(
        `topics_${currentUser}`
      );

    if(savedTopics){

      this.topicCount =
        JSON.parse(savedTopics).length;

    }

  }

  logout() {

    localStorage.removeItem(
      'currentUser'
    );

    this.router.navigate([
      '/login'
    ]);

  }

}

