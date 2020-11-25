import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'myproject';

  updateIsLoggedIn(): void {
    this.setAutoLogout();
  }

  setAutoLogout(): void {
    setTimeout(() => {
      // this.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }, 60 * 60 * 1000);
  }
}
