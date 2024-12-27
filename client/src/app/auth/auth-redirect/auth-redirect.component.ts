import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth-redirect',
    templateUrl: './auth-redirect.component.html',
    styleUrls: ['./auth-redirect.component.css'],
    standalone: false
})
export class AuthRedirectComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Could handle setting logged in cookies here
    this.router.navigate(['/']);
  }
}
