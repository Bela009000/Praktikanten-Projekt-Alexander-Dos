import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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

  constructor(private router: Router) {

    const currentUser =
      localStorage.getItem('currentUser');

    const selectedTopic =
      localStorage.getItem('selectedTopic');

    const topics =
      JSON.parse(

        localStorage.getItem(
          `topics_${currentUser}`
        ) || '[]'

      );

    this.topic =
      topics.find(
        (t: any) =>
        t.name === selectedTopic
      );

  }
  deleteCard(card: any): void {

    const index =
      this.topic.flashcards.indexOf(card);

    if (index === -1) {
      return;
    }

    this.topic.flashcards.splice(index, 1);

    this.save();

  }

  startEdit(card: any): void {

    this.editingCard = card;

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

    this.editingCard = null;

    this.save();

  }

  save(): void {

    const currentUser =
      localStorage.getItem('currentUser');

    const topics =
      JSON.parse(

        localStorage.getItem(
          `topics_${currentUser}`
        ) || '[]'

      );

    const index =
      topics.findIndex(

        (t: any) =>

        t.name === this.topic.name

      );

    topics[index] = this.topic;

    localStorage.setItem(

      `topics_${currentUser}`,

      JSON.stringify(topics)

    );

  }

  cancelEdit(): void {

    this.editingCard = null;

    this.editQuestion = '';

    this.editAnswer = '';

  }

  addFlashcard(): void {

      if(
          !this.newQuestion.trim() ||
          !this.newAnswer.trim()
      ){
          return;
      }

      this.topic.flashcards.push({

          question: this.newQuestion,

          answer: this.newAnswer

      });

      this.save();

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
