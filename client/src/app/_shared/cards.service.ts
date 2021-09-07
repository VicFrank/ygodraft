import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private cardsetsUrl = 'api/cards';

  constructor(private http: HttpClient) {}

  getAllArchetypes() {
    return this.http.get<string[]>(`${this.cardsetsUrl}/archetypes`);
  }
}
