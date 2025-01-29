import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collection } from '../models/collections/Collection.model';
import { UserCollection } from '../models/collections/UserCollection.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { CollectionCard } from '../models/Card.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  private baseUrl = `${environment.apiUrl}/collections`;

  newCollection?: Collection;

  constructor(private http: HttpClient, private authService: AuthService) {}

  clearNewCollection() {
    this.newCollection = undefined;
  }

  createNewCollection(
    cards: CollectionCard[],
    isMasterDuel: boolean,
    name?: string
  ) {
    const numCards = cards.reduce((acc, card) => acc + card.copies, 0);

    this.newCollection = {
      created_at: new Date(),
      updated_at: new Date(),
      collection_id: -1,
      num_cards: numCards,
      collection_cards: cards,
      is_master_duel: isMasterDuel,
      collection_name: name || '',
    };
  }

  async addCardsToCollection(cards: CollectionCard[], collectionId: number) {
    const collection = await this.getCollectionByID(collectionId).toPromise();

    const newCards = cards.map((card) => {
      const existingCard = collection.collection_cards.find(
        (c) => c.card_id === card.card_id
      );
      if (existingCard) {
        existingCard.copies += card.copies;
        return existingCard;
      } else {
        return card;
      }
    });

    collection.collection_cards = collection.collection_cards.concat(newCards);
    (await this.updateCollection(collection)).toPromise();

    return collection;
  }

  getRecentCollections() {
    return this.http.get<UserCollection[]>(this.baseUrl);
  }

  getUserCollections(): Observable<UserCollection[]> {
    if (!this.authService.isLoggedIn) {
      return of([]);
    }
    const userID = this.authService.user?.user_id;
    return this.http.get<UserCollection[]>(`api/users/${userID}/collections`);
  }

  getCollectionByID(id: string | number) {
    return this.http.get<Collection>(`${this.baseUrl}/${id}`);
  }

  createCollection(collection: Collection) {
    const userID = this.authService.user?.user_id;
    const body = {
      cards: collection.collection_cards.map((collectionCard) => ({
        card_id: collectionCard.card_id,
        copies: collectionCard.copies,
      })),
      name: collection.collection_name,
      userID,
      isMasterDuel: collection.is_master_duel,
    };
    return this.http.post(`${this.baseUrl}`, body);
  }

  updateCollection(collection: Collection) {
    const id = collection.collection_id;
    const body = {
      cards: collection.collection_cards.map((collectionCard) => ({
        card_id: collectionCard.card_id,
        copies: collectionCard.copies,
      })),
      name: collection.collection_name,
    };
    return this.http.put(`${this.baseUrl}/${id}`, body);
  }

  updateCollectionName(id: string | number, name: string) {
    return this.http.put(`${this.baseUrl}/${id}/name`, { name });
  }

  deleteCollection(id: string | number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
