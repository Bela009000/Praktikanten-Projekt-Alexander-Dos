import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Firebase } from '../../services/firebase';
import { CommonModule } from '@angular/common';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  topicCount: number = 0;

  flashcardCount: number = 0;

  quizSuccess: number = 0;

  bestMemoryTime = 0;

  successMessage: string = '';

  username: string = '';

  profileImage: string = '';


  constructor(
    private firebase: Firebase,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public theme: Theme
  ) { }
  async ngOnInit() {
    const userId =
      localStorage.getItem(
        'currentUserId'
      );

    if (userId) {

      const user: any =
        await this.firebase
          .getUserById(userId);

      this.profileImage =
        user?.profileImage || '';

      this.username =
        user?.username || '';

    }

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
    const bestMemory: any =
      await this.firebase
        .getBestMemoryResult(
          userId
        );

    if(
      bestMemory
    ){

      this.bestMemoryTime =
        bestMemory.seconds;

    }

    this.flashcardCount =
      cards.length;
    
    this.cdr.detectChanges();

  }

}

