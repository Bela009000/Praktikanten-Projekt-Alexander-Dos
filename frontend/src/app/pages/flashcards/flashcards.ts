import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Firebase } from '../../services/firebase';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FormsModule
  ],
  templateUrl: './flashcards.html',
  styleUrl: './flashcards.css'
})
export class FlashcardsComponent {

  selectedTopic = '';

  topics: any[] = [];

  question = '';

  answer = '';

  editingCard: any = null;

  editingTopic: any = null;

  editQuestion = '';

  editAnswer = '';

  flashcards: any [] = [];

  constructor(
    private firebase: Firebase,
    private router: Router
  ) {

    this.loadTopics();

  }

  async addFlashcard() {

    if (
      !this.question.trim() ||
      !this.answer.trim()
    ) {
      return;
    }

    const topic =
      this.topics.find(
        t => t.name ===
        this.selectedTopic
      );

    if (!topic) {
      return;
    }

    await this.firebase
      .addFlashcard({

        userId:
          localStorage.getItem(
            'currentUserId'
          ),

        topicId:
          topic.id,

        question:
          this.question,

        answer:
          this.answer

      });

    await this.loadFlashcards();

    this.question = '';
    this.answer = '';

  }

  startEdit(
    card: any
  ): void {

    this.editingCard = card;

    this.editQuestion =
      card.question;

    this.editAnswer =
      card.answer;

  }

  async saveEdit() {

    if (
      !this.editQuestion.trim() ||
      !this.editAnswer.trim()
    ) {
      return;
    }

    await this.firebase
      .updateFlashcard(

        this.editingCard.id,

        this.editQuestion,

        this.editAnswer

      );

    await this.loadFlashcards();

    this.cancelEdit();

  }

  cancelEdit(): void {

    this.editingCard = null;

    this.editingTopic = null;

    this.editQuestion = '';

    this.editAnswer = '';

  }

  async deleteFlashcard(
    card: any
  ) {

    await this.firebase
      .deleteFlashcard(
        card.id
      );

    await this.loadFlashcards();

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
  async loadTopics() {

    this.topics =
      await this.firebase
        .getTopicsByUser(

          localStorage.getItem(
            'currentUserId'
          ) || ''

        );

  }
  async loadFlashcards() {

    const topic =
      this.topics.find(
        t => t.name ===
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

  }
  async onTopicChange() {

    await this.loadFlashcards();

  }

}