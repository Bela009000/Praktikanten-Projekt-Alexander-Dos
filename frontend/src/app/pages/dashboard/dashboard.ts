import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Firebase } from '../../services/firebase';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  topicCount: number = 0;

  flashcardCount: number = 0;

  quizSuccess: number = 0;

  successMessage: string = '';

  constructor(
    private firebase: Firebase,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }
  async ngOnInit() {

    await this.loadDashboard();

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

    this.topicCount =
      topics.length;
    
    this.quizSuccess =
      await this.firebase
        .getQuizResult(
          userId
        );

    const cards =
      await this.firebase
        .getFlashcardsByUser(
          userId
        );

    this.flashcardCount =
      cards.length;
    
    this.cdr.detectChanges();

  }

}

