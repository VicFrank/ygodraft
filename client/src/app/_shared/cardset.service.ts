import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cardset } from '../models/Cardset.model';

@Injectable({
  providedIn: 'root',
})
export class CardsetService {
  cardsetsUrl = 'api/cardsets';

  constructor(private http: HttpClient) {}

  getAllCardsets() {
    return this.http.get<Cardset[]>(this.cardsetsUrl);
  }

  getAllCardsetsByType(type: string) {
    return this.http.get<Cardset[]>(`${this.cardsetsUrl}?type=${type}`);
  }
}
