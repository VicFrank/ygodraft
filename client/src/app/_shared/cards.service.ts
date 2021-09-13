import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Card } from '../models/Card.model';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private baseUrl = `${environment.apiUrl}/cards`;

  constructor(private http: HttpClient) {}

  getAllArchetypes() {
    return this.http.get<string[]>(`${this.baseUrl}/archetypes`);
  }

  bulkGetCards(cardIDs: string[]) {
    return this.http.post<Card[]>(`${this.baseUrl}/bulk-get`, { cardIDs });
  }
}
