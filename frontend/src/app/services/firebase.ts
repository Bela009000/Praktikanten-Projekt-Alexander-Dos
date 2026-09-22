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
  updateDoc,
  query,
  where,
  getDoc
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

    const q = query(

      collection(
        this.db,
        'topics'
      ),

      where(
        'userId',
        '==',
        userId
      )

    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(
      doc => ({
        id: doc.id,
        ...doc.data()
      })
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
    async getFlashcardsByUser(
      userId: string
    ) {

      const q = query(

        collection(
          this.db,
          'flashcards'
        ),

        where(
          'userId',
          '==',
          userId
        )

      );

      const snapshot =
        await getDocs(q);

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

      const q = query(

        collection(
          this.db,
          'flashcards'
        ),

        where(
          'topicId',
          '==',
          topicId
        )

      );

      const snapshot =
        await getDocs(q);

      return snapshot.docs.map(
        doc => ({
          id: doc.id,
          ...doc.data()
        })
      );

    }
    async getTopicById(
      topicId: string
    ) {

      const snapshot =
        await getDoc(

          doc(
            this.db,
            'topics',
            topicId
          )

        );

      if (
        !snapshot.exists()
      ) {
        return null;
      }

      return {

        id: snapshot.id,

        ...snapshot.data()

      };

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
    async saveQuizResult(
      userId: string,
      successRate: number
    ) {

      const q = query(

        collection(
          this.db,
          'quizResults'
        ),

        where(
          'userId',
          '==',
          userId
        )

      );

      const snapshot =
        await getDocs(q);

      if (
        snapshot.docs.length > 0
      ) {

        await updateDoc(

          snapshot.docs[0].ref,

          {
            successRate
          }

        );

      } else {

        await addDoc(

          collection(
            this.db,
            'quizResults'
          ),

          {
            userId,
            successRate
          }

        );

      }

    }
    async getQuizResult(
      userId: string
    ) {

      const q = query(

        collection(
          this.db,
          'quizResults'
        ),

        where(
          'userId',
          '==',
          userId
        )

      );

      const snapshot =
        await getDocs(q);

      if (
        snapshot.empty
      ) {
        return 0;
      }

      return snapshot.docs[0]
        .data()['successRate'];

    }
}