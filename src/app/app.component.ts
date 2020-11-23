import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'myproject';
  isLoggedIn = false;

  updateIsLoggedIn(): void {
    this.isLoggedIn = true;
    this.setAutoLogout();
  }

  setAutoLogout(): void {
    setTimeout(() => {
      this.isLoggedIn = false;
    }, 60 * 60 * 1000);
  }
}
