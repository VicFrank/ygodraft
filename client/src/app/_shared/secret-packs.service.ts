import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecretPack } from '../models/secret_packs/SecretPack.model';
import { Card, SecretPackCard } from '../models/Card.model';

@Injectable({
  providedIn: 'root',
})
export class SecretPacksService {
  secretPacksUrl = 'api/secret_packs';

  constructor(private http: HttpClient) {}

  getSecretPacks() {
    return this.http.get<SecretPack[]>(this.secretPacksUrl);
  }

  getSecretPack(id: string | number) {
    return this.http.get<SecretPack>(`${this.secretPacksUrl}/${id}`);
  }

  generatePacks(secretPackId: string | number | undefined, numPacks: number) {
    return this.http
      .get<SecretPackCard[][]>(
        `${this.secretPacksUrl}/actions/open?secretPackId=${secretPackId}&numPacks=${numPacks}`
      )
      .toPromise();
  }
}
