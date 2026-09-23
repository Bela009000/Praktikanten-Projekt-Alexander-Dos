import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Firebase } from '../../services/firebase';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    RouterLinkActive
  ],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css'
})
export class QuizComponent implements OnInit {

  topics: any[] = [];

  selectedTopic = '';

  questions: any[] = [];

  currentIndex = 0;

  userAnswer = '';

  showSolution = false;

  correctAnswers = 0;

  wrongCards: any[] = [];

  quizFinished = false;

  successRate = 0;

  isCorrect = false;

  constructor(
    private firebase: Firebase,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }
  async ngOnInit() {

    await this.loadTopics();

  }

  async startQuiz() {

    const topic =
      this.topics.find(

        t =>

        t.id === this.selectedTopic

      );
    if (!topic) {
      return;
    }

    this.questions =
      await this.firebase
        .getFlashcardsByTopic(
          topic.id
        );
    this.cdr.detectChanges();

    this.currentIndex = 0;

    this.userAnswer = '';

    this.correctAnswers = 0;

    this.wrongCards = [];

    this.showSolution = false;

    this.quizFinished = false;

    this.successRate = 0;

  }

  checkAnswer(): void {

    if (!this.userAnswer.trim()) {
      return;
    }

    const correctAnswer =
      this.questions[
        this.currentIndex
      ].answer;

    const user =
      this.userAnswer
        .trim()
        .toLowerCase();

    const correct =
      correctAnswer
        .trim()
        .toLowerCase();

    this.isCorrect =
      user === correct;

    if (this.isCorrect) {

      this.correctAnswers++;

    } else {

      this.wrongCards.push(

        this.questions[
          this.currentIndex
        ]

      );

    }

    this.showSolution = true;

  }

  async nextQuestion() {

    if (
      this.currentIndex <
      this.questions.length - 1
    ) {

      this.currentIndex++;

      this.userAnswer = '';

      this.showSolution = false;

      return;

    }

    if (
      this.questions.length === 0
    ) {
      return;
    }
      this.successRate =
        Math.round(

          (
            this.correctAnswers /
            this.questions.length
          ) * 100

        );

      await this.firebase
        .saveQuizResult(

          localStorage.getItem(
            'currentUserId'
          ) || '',

          this.successRate

        );

      this.quizFinished = true;

  }

  retryWrongCards(): void {

    this.questions =
      [...this.wrongCards];

    this.currentIndex = 0;

    this.correctAnswers = 0;

    this.userAnswer = '';

    this.showSolution = false;

    this.quizFinished = false;

    this.successRate = 0;

    this.wrongCards = [];

    this.isCorrect = false;

  }

  cancelQuiz(): void {

    this.questions = [];

    this.currentIndex = 0;

    this.userAnswer = '';

    this.showSolution = false;

    this.correctAnswers = 0;

    this.wrongCards = [];

    this.quizFinished = false;

    this.successRate = 0;

    this.isCorrect = false;

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
      'currentUserId'
    );

    localStorage.removeItem(
      'loginSuccess'
    );

    this.router.navigate([
      '/login'
    ]);

  }
  async loadTopics() {

    this.topics =
      await this.firebase
        .getTopicsByUser(

          localStorage.getItem(
            'currentUserId'
          ) || ''

        );
    this.cdr.detectChanges();

  }

}