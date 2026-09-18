import { Injectable } from '@angular/core';

import {
  initializeApp
} from 'firebase/app';

import {
  getFirestore,
  collection,
  getDocs,
  addDoc
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

  async addTopic(topic: any) {

    await addDoc(
      collection(
        this.db,
        'topics'
      ),
      topic
    );

  }

}