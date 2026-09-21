import { Injectable } from '@angular/core';

import {
  initializeApp
} from 'firebase/app';

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Firebase {

  private app = initializeApp(
    environment.firebase
  );

  private db = getFirestore(
    this.app
  );

  async getTopics() {

    const snapshot =
      await getDocs(
        collection(
          this.db,
          'topics'
        )
      );

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

  }
  async getTopicsByUser(
    userId: string
  ) {

    const topics =
      await this.getTopics();

    return topics.filter(

      (topic: any) =>

        topic.userId ===
        userId

    );

  }

  async addTopic(topic: any) {

    await addDoc(
      collection(
        this.db,
        'topics'
      ),
      topic
    );

  }
  async deleteTopic(id: string) {

    await deleteDoc(
        doc(
        this.db,
        'topics',
        id
        )
    );
  }
  async updateTopic(
    id: string,
    name: string
    ) {

    await updateDoc(

        doc(
        this.db,
        'topics',
        id
        ),

        {
        name: name
        }

    );

    }

    async addFlashcard(
        flashcard: any
    ) {

    await addDoc(

        collection(
        this.db,
        'flashcards'
        ),

        flashcard

    );

    }
    async getFlashcards() {

        const snapshot =

            await getDocs(

            collection(
                this.db,
                'flashcards'
            )

            );

        return snapshot.docs.map(
            doc => ({

            id: doc.id,

            ...doc.data()

            })
        );

    }

    async getFlashcardsByTopic(
    topicId: string
    ) {

    const snapshot =
        await getDocs(

        collection(
            this.db,
            'flashcards'
        )

        );

    return snapshot.docs
        .map(doc => ({

        id: doc.id,

        ...doc.data()

        }))
        .filter(
        (card: any) =>
        card.topicId === topicId
        );

    }
    async getTopicById(
        topicId: string
    ) {

        const topics =
        await this.getTopics();

        return topics.find(
        (topic: any) =>
        topic.id === topicId
        );

    }

    async deleteFlashcard(
    id: string
    ) {

    await deleteDoc(
        doc(
        this.db,
        'flashcards',
        id
        )
    );

    }

    async updateFlashcard(

    id: string,

    question: string,

    answer: string

    ) {

    await updateDoc(

        doc(
        this.db,
        'flashcards',
        id
        ),

        {
        question,
        answer
        }

    );

    }
    async addUser(user: any) {

    await addDoc(

        collection(
        this.db,
        'users'
        ),

        user

    );

    }
    async getUsers() {

    const snapshot =

        await getDocs(

        collection(
            this.db,
            'users'
        )

        );

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

    }
}