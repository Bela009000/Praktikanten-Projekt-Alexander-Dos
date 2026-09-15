import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './topics.html',
  styleUrl: './topics.css'
})
export class TopicsComponent {

  topicName: string = '';

  topics: string[] = [];

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

  }

  addTopic() {

    if (this.topicName.trim() === '') {
      return;
    }

    this.topics.push(
      this.topicName
    );

    const currentUser =
      localStorage.getItem(
        'currentUser'
      );

    localStorage.setItem(
      `topics_${currentUser}`,
      JSON.stringify(this.topics)
    );

    this.topicName = '';

  }

  deleteTopic(index: number) {

    this.topics.splice(
      index,
      1
    );

    const currentUser =
      localStorage.getItem(
        'currentUser'
      );

    localStorage.setItem(
      `topics_${currentUser}`,
      JSON.stringify(this.topics)
    );

  }

}