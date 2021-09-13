import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}`;
  constructor() {}

  getUser() {
    return {
      user_id: 1,
      username: 'VicFrank',
    };
  }
}
