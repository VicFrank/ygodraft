import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
