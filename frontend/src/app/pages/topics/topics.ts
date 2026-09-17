import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './topics.html',
  styleUrl: './topics.css'
})
export class TopicsComponent {

  topicName = '';

  topics: any[] = [];

  editingIndex = -1;

  editingName = '';

  constructor(
    private router: Router
  ) {

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

  }

  addTopic(): void {

    if (this.topicName.trim() === '') {
      return;
    }

    this.topics.push({

      name: this.topicName.trim(),

      flashcards: []

    });

    this.saveTopics();

    this.topicName = '';

  }

  deleteTopic(index: number): void {

    this.topics.splice(
      index,
      1
    );

    this.saveTopics();

  }

  startEdit(index: number): void {

    this.editingIndex =
      index;

    this.editingName =
      this.topics[index].name;

  }

  saveEdit(): void {

    if (this.editingName.trim() === '') {
      return;
    }

    this.topics[this.editingIndex].name =
      this.editingName.trim();

    this.saveTopics();

    this.editingIndex = -1;

    this.editingName = '';

  }

  cancelEdit(): void {

    this.editingIndex = -1;

    this.editingName = '';

  }

  openTopic(topic: any): void {

  localStorage.setItem(
    'selectedTopic',
    topic.name
  );

  this.router.navigate([
    '/topic-cards'
  ]);

}

  private saveTopics(): void {

    const currentUser =
      localStorage.getItem('currentUser');

    localStorage.setItem(
      `topics_${currentUser}`,
      JSON.stringify(this.topics)
    );

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