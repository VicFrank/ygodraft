import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecretPack } from '../models/secret_packs/SecretPack.model';
import { SecretPackCard } from '../models/Card.model';
import { Observable, of, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SecretPacksService {
  secretPacksUrl = 'api/secret_packs';

  constructor(private http: HttpClient) {}

  getSecretPacks(searchText?: string): Observable<SecretPack[]> {
    const url = searchText
      ? `${this.secretPacksUrl}?search=${encodeURIComponent(searchText)}`
      : this.secretPacksUrl;
    return this.http.get<SecretPack[]>(url);
  }

  getSecretPack(id: string | number) {
    return this.http.get<SecretPack>(`${this.secretPacksUrl}/${id}`);
  }

  generatePacks(numPacks: number, secretPackId?: string | number) {
    let url = `${this.secretPacksUrl}/actions/open?numPacks=${numPacks}`;
    if (secretPackId != null) {
      url += `&secretPackId=${secretPackId}`;
    }
    return this.http.get<SecretPackCard[][]>(url).toPromise();
  }
}
