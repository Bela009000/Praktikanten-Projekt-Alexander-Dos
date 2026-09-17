import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLink, RouterLinkActive],
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

      const topics =
        JSON.parse(savedTopics);

      this.topicCount =
        topics.length;

      let totalCards = 0;

      for(const topic of topics){

        totalCards +=
          topic.flashcards.length;

      }

      this.flashcardCount =
        totalCards;

    }
    const savedSuccess =

      localStorage.getItem(

        `quizSuccess_${currentUser}`

      );

    if(savedSuccess){

      this.quizSuccess =
        Number(savedSuccess);

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

