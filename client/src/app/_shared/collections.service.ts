import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collection } from '../models/collections/Collection.model';
import { CollectionCard } from '../models/collections/CollectionCard.model';
import { UserCollection } from '../models/collections/UserCollection.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  private baseUrl = `${environment.apiUrl}/collections`;

  newCollection?: Collection;

  constructor(private http: HttpClient, private auth: AuthService) {}

  clearNewCollection() {
    this.newCollection = undefined;
  }

  createNewCollectionWeb(collection: CollectionCard[], numCards: number) {
    this.newCollection = {
      created_at: new Date(),
      updated_at: new Date(),
      collection_id: -1,
      num_cards: numCards,
      collection_cards: collection,
    };
  }

  getRecentCollections() {
    return this.http.get<UserCollection[]>(this.baseUrl);
  }

  getUserCollections(userID: string | number) {
    return this.http.get<UserCollection[]>(`api/users/${userID}/collections`);
  }

  getCollectionByID(id: string | number) {
    return this.http.get<Collection>(`${this.baseUrl}/${id}`);
  }

  createCollection(cards: CollectionCard[]) {
    const userID = this.auth.getUser().user_id;
    const body = {
      cards: cards.map((collectionCard) => ({
        card_id: collectionCard.card_id,
        copies: collectionCard.copies,
      })),
      userID,
    };
    return this.http.post(`${this.baseUrl}`, body);
  }

  updateCollection(id: string | number, cards: CollectionCard[]) {
    const body = {
      cards: cards.map((collectionCard) => ({
        card_id: collectionCard.card_id,
        copies: collectionCard.copies,
      })),
    };
    return this.http.put(`${this.baseUrl}/${id}`, body);
  }

  deleteCollection(id: string | number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
