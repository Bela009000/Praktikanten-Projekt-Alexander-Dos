import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Firebase } from '../../services/firebase';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-memory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './memory.html',
  styleUrl: './memory.css'
})
export class MemoryComponent {

  topics: any[] = [];

  selectedTopic = '';

  memoryCards: any[] = [];

  firstCard: any = null;

  secondCard: any = null;

  seconds = 0;

  timer: any;

  moves = 0;

  matches = 0;

  gameFinished = false;

  constructor(
    private firebase: Firebase,
    private theme: Theme,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {

    const userId =
      localStorage.getItem(
        'currentUserId'
      ) || '';

    this.topics =
      await this.firebase
        .getTopicsByUser(
          userId
        );
    this.cdr.detectChanges();

  }

  async startMemory() {

    if (!this.selectedTopic) {
      return;
    }

    const flashcards =
      await this.firebase
        .getFlashcardsByTopic(
          this.selectedTopic
        );

    this.memoryCards = [];

    this.matches = 0;

    this.moves = 0;

    this.gameFinished = false;

    flashcards.forEach(
      (flashcard: any, index: number) => {

        this.memoryCards.push({

          text: flashcard.question,

          pairId: index,

          flipped: false,

          matched: false

        });

        this.memoryCards.push({

          text: flashcard.answer,

          pairId: index,

          flipped: false,

          matched: false

        });

      }
    );

    this.memoryCards.sort(
      () => Math.random() - 0.5
    );
    this.cdr.detectChanges();

    clearInterval(
      this.timer
    );

    this.seconds = 0;

    this.timer =
      setInterval(() => {

        this.seconds++;

      }, 1000);

  }

  async flipCard(card: any) {

    if (
      card.flipped ||
      card.matched
    ) {
      return;
    }

    if (
      this.secondCard
    ) {
      return;
    }

    card.flipped = true;

    if (!this.firstCard) {

      this.firstCard = card;

      return;

    }

    this.secondCard = card;

    this.moves++;

    if (

      this.firstCard.pairId ===
      this.secondCard.pairId

    ) {

      this.firstCard.matched =
        true;

      this.secondCard.matched =
        true;

      this.matches++;

      this.firstCard = null;

      this.secondCard = null;

      const totalPairs =
        this.memoryCards.length / 2;

      if (
        this.matches === totalPairs
      ) {

        clearInterval(
          this.timer
        );

        const userId =
          localStorage.getItem(
            'currentUserId'
          ) || '';

        await this.firebase
          .saveMemoryResult(
            userId,
            this.moves,
            this.seconds
          );
        this.gameFinished = true;

      }

      return;

    }

    setTimeout(() => {

      this.firstCard.flipped =
        false;

      this.secondCard.flipped =
        false;

      this.firstCard = null;

      this.secondCard = null;

    }, 1000);

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

    this.theme.setDarkMode();

  }

}