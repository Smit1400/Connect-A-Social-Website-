import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
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
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onSignUpPressed(): void {
    if (this.formGroup.valid) {
      this.authService.signUpService(this.formGroup.value).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['login']);
        },
        (error) => {
          console.log(error);
          this.formGroup.reset();
        }
      );
    }
  }
}
