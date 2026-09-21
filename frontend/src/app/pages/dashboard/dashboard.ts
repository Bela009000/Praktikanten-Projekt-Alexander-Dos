import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Firebase } from '../../services/firebase';

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

  constructor(
    private firebase: Firebase,
    private router: Router
  ) {
    this.loadDashboard();
  }

  logout() {

    localStorage.removeItem(
      'currentUser'
    );

    this.router.navigate([
      '/login'
    ]);

  }
  async loadDashboard() {

    const userId =
      localStorage.getItem(
        'currentUserId'
      ) || '';

    const topics =
      await this.firebase
        .getTopicsByUser(
          userId
        );
    console.log(
      'USER ID:',
      userId
    );

    console.log(
      'TOPICS:',
      topics
    );

    this.topicCount =
      topics.length;

    let flashcardTotal = 0;

    for (
      const topic of topics
    ) {

      const cards =
        await this.firebase
          .getFlashcardsByTopic(
            topic.id
          );

      flashcardTotal +=
        cards.length;

    }

    console.log(
      'FLASHCARDS:',
      flashcardTotal
    );

    this.flashcardCount =
      flashcardTotal;

    console.log(
      'TOPIC COUNT:',
      this.topicCount
    );

    console.log(
      'FLASHCARD COUNT:',
      this.flashcardCount
    );
    this.flashcardCount =
      flashcardTotal;
  }

}

