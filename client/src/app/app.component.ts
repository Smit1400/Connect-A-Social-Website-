import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'myproject';
  isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  constructor(private router: Router) {}

  updateIsLoggedIn(): void {
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.setAutoLogout();
  }

  setAutoLogout(): void {
    setTimeout(() => {
      localStorage.clear();
      localStorage.setItem('isLoggedIn', 'false');
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      this.router.navigate(['/login']);
    }, 60 * 60 * 1000);
  }

  logout(): void {
    localStorage.clear();
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.router.navigate(['/login']);
  }
}
