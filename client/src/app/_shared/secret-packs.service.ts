import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecretPack } from '../models/secret_packs/SecretPack.model';

@Injectable({
  providedIn: 'root',
})
export class SecretPacksService {
  secretPacksUrl = 'api/secret_packs';

  constructor(private http: HttpClient) {}

  getSecretPacks() {
    return this.http.get<SecretPack[]>(this.secretPacksUrl);
  }

  getSecretPack(id: number | string) {
    return this.http.get<SecretPack>(`${this.secretPacksUrl}/${id}`);
  }
}
