import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private appComp: AppComponent
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onLoginPressed(): void {
    if (this.formGroup.valid) {
      this.authService.loginService(this.formGroup.value).subscribe(
        (data) => {
          console.log(data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          this.appComp.updateIsLoggedIn();
          this.router.navigate(['']);
        },
        (error) => {
          console.log(error);
          this.formGroup.reset();
        }
      );
    }
  }
}
