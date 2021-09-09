import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collection } from '../models/collections/Collection.model';
import { CollectionCard } from '../models/collections/CollectionCard.model';
import { UserCollection } from '../models/collections/UserCollection.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  cardsetsUrl = 'api/collections';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getRecentCollections() {
    return this.http.get<UserCollection[]>(this.cardsetsUrl);
  }

  getCollection(id: number) {
    return this.http.get<Collection[]>(`${this.cardsetsUrl}/${id}`);
  }

  createCollection(cards: CollectionCard[]) {
    const userID = this.auth.getUser().user_id;
    const body = {
      data: cards.map((collectionCard) => ({
        id: collectionCard.card.card_id,
        copies: collectionCard.copies,
      })),
      userID,
    };
    return this.http.post(`${this.cardsetsUrl}`, body);
  }

  updateCollection(id: number, cards: CollectionCard[]) {
    const body = {
      data: cards.map((collectionCard) => ({
        id: collectionCard.card.card_id,
        copies: collectionCard.copies,
      })),
    };
    return this.http.put(`${this.cardsetsUrl}/${id}`, body);
  }

  deleteCollection(id: number) {
    return this.http.delete(`${this.cardsetsUrl}/${id}`);
  }
}
