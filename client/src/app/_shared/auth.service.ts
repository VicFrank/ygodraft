import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getUser() {
    return {
      user_id: 1,
      username: 'VicFrank',
    };
  }
}
