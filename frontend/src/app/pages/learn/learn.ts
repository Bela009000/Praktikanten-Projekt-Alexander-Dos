import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Firebase } from '../../services/firebase';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    RouterLinkActive
  ],
  templateUrl: './learn.html',
  styleUrl: './learn.css'
})
export class LearnComponent {

  topics: any[] = [];

  selectedTopic = '';

  flashcards: any[] = [];

  wrongCards: any[] = [];

  currentIndex = 0;

  showAnswer = false;

  learningFinished = false;

  successRate = 0;

  isLearning = false;

  constructor(
    private firebase: Firebase,
    private router: Router
  ) {

    this.loadTopics();

  }
  async loadTopics() {

    this.topics =
      await this.firebase
        .getTopics();

  }

  async startLearning() {

    const topic =
      this.topics.find(
        t =>
        t.name ===
        this.selectedTopic
      );

    if (!topic) {
      return;
    }

    this.flashcards =
      await this.firebase
        .getFlashcardsByTopic(
          topic.id
        );

    this.currentIndex = 0;

    this.showAnswer = false;

    this.learningFinished = false;

    this.wrongCards = [];

    this.successRate = 0;

    this.isLearning = true;

  }

  revealAnswer(): void {

    this.showAnswer = true;

  }

  markCorrect(): void {

    this.nextCard();

  }

  markWrong(): void {

    this.wrongCards.push(

      this.flashcards[
        this.currentIndex
      ]

    );

    this.nextCard();

  }

  nextCard(): void {

    if (
      this.currentIndex <
      this.flashcards.length - 1
    ) {

      this.currentIndex++;

      this.showAnswer = false;

      return;

    }

    const correctAnswers =
      this.flashcards.length -
      this.wrongCards.length;

    this.successRate =
      Math.round(

        (
          correctAnswers /
          this.flashcards.length
        ) * 100

      );

    this.learningFinished = true;

    this.isLearning = false;

    this.showAnswer = false;

  }

  learnWrongCards(): void {

    this.flashcards =
      [...this.wrongCards];

    this.wrongCards = [];

    this.currentIndex = 0;

    this.showAnswer = false;

    this.learningFinished = false;

    this.successRate = 0;

    this.isLearning = true;

  }
  goBack(): void {

      this.router.navigate([
          '/dashboard'
      ]);

  }
  logout(): void {

    localStorage.removeItem(
      'currentUser'
    );

    localStorage.removeItem(
      'loginSuccess'
    );

    this.router.navigate([
      '/login'
    ]);

  }
  cancelLearning(): void {

    this.flashcards = [];

    this.currentIndex = 0;

    this.showAnswer = false;

    this.learningFinished = false;

    this.wrongCards = [];

    this.successRate = 0;

    this.isLearning = false;

  }

}