import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PackCard } from 'src/app/models/drafting/PackCard.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PackOpeningService {
  private baseUrl = `${environment.apiUrl}/packs`;

  constructor(private http: HttpClient) {}

  generatePacks(cardset: string, numPacks: number) {
    return this.http.get<PackCard[][]>(
      `${this.baseUrl}/open?cardset=${cardset}&numPacks=${numPacks}`
    );
  }

  openSets(cardsets: string[], numPacks: number) {
    const data = { cardsets, numPacks };
    const config = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post<PackCard[][]>(
      `${this.baseUrl}/openSets`,
      data,
      config
    );
  }
}
