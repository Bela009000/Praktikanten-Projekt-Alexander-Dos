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

  addTopic() {

    if (this.topicName.trim() === '') {
      return;
    }

    this.topics.push(this.topicName);

    this.topicName = '';
  }

  deleteTopic(index: number) {

    this.topics.splice(index, 1);

  }
}
``