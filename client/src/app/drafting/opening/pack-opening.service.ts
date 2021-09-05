import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PackCard } from 'src/app/models/drafting/PackCard.model';

@Injectable({
  providedIn: 'root',
})
export class PackOpeningService {
  apiUrl = 'api/packs';

  constructor(private http: HttpClient) {}

  generatePacks(cardset: string, numPacks: number) {
    return this.http.get<PackCard[][]>(
      `${this.apiUrl}/open?cardset=${cardset}&numPacks=${numPacks}`
    );
  }

  openSets(cardsets: string[], numPacks: number) {
    const data = { cardsets, numPacks };
    const config = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post<PackCard[][]>(
      `${this.apiUrl}/openSets`,
      data,
      config
    );
  }
}
