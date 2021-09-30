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
  private _user?: User;

  isLoggedInChanged: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedInChanged.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  public get user(): User | undefined {
    return this._user;
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
          this._user = user;
          this.isLoggedInChanged.next(true);
        } else {
          this._user = undefined;
          this.isLoggedInChanged.next(false);
        }
      },
      (error) => {
        console.error(error);
        this._user = undefined;
        this.isLoggedInChanged.next(false);
      }
    );
  }

  logout() {
    this.http
      .get<boolean>(`${this.baseUrl}/auth/logout`)
      .subscribe((res: any) => {
        this.isLoggedInChanged.next(false);
        this._user = undefined;
        window.location.href = '/';
      });
  }
}
