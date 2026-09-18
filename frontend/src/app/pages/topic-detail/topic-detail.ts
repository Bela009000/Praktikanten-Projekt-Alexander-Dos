import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { Firebase }
from '../../services/firebase';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topic-cards',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    RouterLinkActive
  ],
  templateUrl: './topic-detail.html',
  styleUrl: './topic-detail.css'
})
export class TopicDetailComponent {

  topic: any;
  editingCard: any = null;

  editQuestion = '';  

  editAnswer = '';

  newQuestion = '';

  newAnswer = '';

  flashcards: any[] = [];

  constructor(
    private router: Router,
    private firebase: Firebase
  ) {

    this.loadTopic();
  }
  async loadFlashcards() {

    try {

      const cards =

        await this.firebase
          .getFlashcardsByTopic(
            this.topic.id
          );

      console.log(
        'FLASHCARDS:',
        cards
      );    
      this.flashcards = cards;

    }

    catch(error) {

      console.error(error);

    }

  }
  async loadTopic() {

    const topicId =
      localStorage.getItem(
        'selectedTopicId'
      );

    if (!topicId) {
      return;
    }

    this.topic =
      await this.firebase
        .getTopicById(topicId);

    console.log(
      'TOPIC:',
      this.topic
    );

    await this.loadFlashcards();

  }
  async deleteCard(
    card: any
  ) {

    await this.firebase
      .deleteFlashcard(
        card.id
      );

    await this.loadFlashcards();

  }


  startEdit(card: any): void {

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

    this.editingCard = null;

    this.editQuestion = '';

    this.editAnswer = '';

  }

  cancelEdit(): void {

    this.editingCard = null;

    this.editQuestion = '';

    this.editAnswer = '';

  }

  async addFlashcard() {

    if (
      !this.newQuestion.trim() ||
      !this.newAnswer.trim()
    ) {
      return;
    }

    await this.firebase.addFlashcard({

      topicId: this.topic.id,

      question: this.newQuestion,

      answer: this.newAnswer

    });

    await this.loadFlashcards();

    this.newQuestion = '';

    this.newAnswer = '';

  }
  goBack(): void {

      this.router.navigate([
          '/topics'
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

}
