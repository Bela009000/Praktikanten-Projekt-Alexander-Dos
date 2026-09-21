import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Firebase } from '../../services/firebase';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive,],
  templateUrl: './topics.html',
  styleUrl: './topics.css'
})
export class TopicsComponent {

  topicName = '';

  topics: any[] = [];

  editingIndex = -1;

  editingName = '';

  constructor(
    private router: Router,
    private firebase: Firebase
  ) {

    console.log('TOPICS GELADEN');

    this.loadTopics();

  }
  async loadTopics() {

    try {

      const topics =
        await this.firebase.getTopicsByUser(

          localStorage.getItem(
            'currentUserId'
          ) || ''

        );

      console.log(
        'FIREBASE:',
        topics
      );

      this.topics = topics;

    }

    catch(error) {

      console.error(
        'Firebase Fehler:',
        error
      );

    }

  }

  async addTopic() {

    if (this.topicName.trim() === '') {
      return;
    }

    await this.firebase.addTopic({

      userId:
        localStorage.getItem(
          'currentUserId'
        ),

      name:
        this.topicName.trim()

    });

    await this.loadTopics();

        this.topicName = '';

      }

  async deleteTopic(
    index: number
  ) {

    await this.firebase.deleteTopic(

      this.topics[index].id

    );

    await this.loadTopics();

  }

  startEdit(index: number): void {

    this.editingIndex =
      index;

    this.editingName =
      this.topics[index].name;

  }

  async saveEdit() {

      if (
        this.editingName.trim() === ''
      ) {
        return;
      }

      await this.firebase.updateTopic(

        this.topics[
          this.editingIndex
        ].id,

        this.editingName.trim()

      );

      await this.loadTopics();

      this.editingIndex = -1;

      this.editingName = '';

  }

  cancelEdit(): void {

    this.editingIndex = -1;

    this.editingName = '';

  }

  openTopic(topic: any): void {

    localStorage.setItem(
      'selectedTopicId',
      topic.id
    );

    this.router.navigate([
      '/topic-cards'
    ]);

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

}