import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
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

  constructor() {

    const currentUser =
      localStorage.getItem('currentUser');

    const savedTopics =
      localStorage.getItem(
        `topics_${currentUser}`
      );

    if (savedTopics) {

      this.topics =
        JSON.parse(savedTopics);

    }

    this.selectedTopic =
      localStorage.getItem(
        'selectedTopic'
      ) || '';

  }

  addFlashcard(): void {

    if (
      !this.question.trim() ||
      !this.answer.trim()
    ) {
      return;
    }

    const topic =
      this.topics.find(
        t => t.name === this.selectedTopic
      );

    if (!topic) {
      return;
    }

    topic.flashcards.push({

      question: this.question,

      answer: this.answer

    });

    const currentUser =
      localStorage.getItem('currentUser');

    localStorage.setItem(

      `topics_${currentUser}`,

      JSON.stringify(this.topics)

    );

    this.question = '';

    this.answer = '';

  }

  startEdit(
    card: any,
    topic: any
  ): void {

    this.editingCard = card;

    this.editingTopic = topic;

    this.editQuestion =
      card.question;

    this.editAnswer =
      card.answer;

  }

  saveEdit(): void {

    if (
      !this.editQuestion.trim() ||
      !this.editAnswer.trim()
    ) {
      return;
    }

    this.editingCard.question =
      this.editQuestion;

    this.editingCard.answer =
      this.editAnswer;

    const currentUser =
      localStorage.getItem('currentUser');

    localStorage.setItem(

      `topics_${currentUser}`,

      JSON.stringify(this.topics)

    );

    this.cancelEdit();

  }

  cancelEdit(): void {

    this.editingCard = null;

    this.editingTopic = null;

    this.editQuestion = '';

    this.editAnswer = '';

  }

  deleteFlashcard(
    card: any,
    topic: any
  ): void {

    const index =
      topic.flashcards.indexOf(card);

    if (index === -1) {
      return;
    }

    topic.flashcards.splice(
      index,
      1
    );

    const currentUser =
      localStorage.getItem('currentUser');

    localStorage.setItem(

      `topics_${currentUser}`,

      JSON.stringify(this.topics)

    );

  }

}