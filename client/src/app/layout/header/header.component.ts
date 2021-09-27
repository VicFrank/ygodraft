import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private authSerivce: AuthService) {}

  ngOnInit(): void {
    this.authSerivce.checkLogin();
  }

  get isLoggedIn(): boolean {
    return this.authSerivce.isLoggedIn;
  }

  logout() {
    this.authSerivce.logout();
  }
}
