import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User.model.ts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}`;
  isLoggedIn: boolean = false;
  private user?: User;

  isLoggedInChanged: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedInChanged.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  public get username(): User | undefined {
    return this.user;
  }

  getUser() {
    return {
      user_id: 1,
      username: 'VicFrank',
    };
  }

  isUsernameTaken(username: string) {
    return this.http.get<boolean>(
      `${this.baseUrl}/users/user/exists?username=${username}`
    );
  }

  checkLogin() {
    this.http.get<boolean>(`${this.baseUrl}/auth/success`).subscribe(
      (res: any) => {
        const { success, user } = res;
        if (success) {
          this.user = user;
          this.isLoggedInChanged.next(true);
        } else {
          this.user = undefined;
          this.isLoggedInChanged.next(false);
        }
      },
      (error) => {
        console.error(error);
        this.user = undefined;
        this.isLoggedInChanged.next(false);
      }
    );
  }

  logout() {
    this.http
      .get<boolean>(`${this.baseUrl}/auth/logout`)
      .subscribe((res: any) => {
        this.isLoggedInChanged.next(false);
        this.user = undefined;
        window.location.href = '/';
      });
  }
}
