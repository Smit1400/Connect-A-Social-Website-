import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {
  forumData;
  name;
  email;
  formGroup: FormGroup;

  constructor(
    private databaseService: DatabaseService,
    private router: Router,
    private appComp: AppComponent
  ) {}

  ngOnInit(): void {
    this.getAllForums();
    this.initForm();
    this.initializeUserData();
  }

  initializeUserData(): void {
    this.email = localStorage.getItem('email');
    this.name = localStorage.getItem('name');
    console.log('email = ' + this.email);
    console.log('name = ' + this.name);
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      question: new FormControl('', [Validators.required, Validators.email]),
      description: new FormControl('', [Validators.required]),
    });
  }

  getAllForums(): void {
    this.databaseService.getAllForums().subscribe(
      (data) => {
        this.forumData = data.forums;
        // console.log(data.forums);
      },
      (error) => {
        if (error.status === 500) {
          this.appComp.logout();
        }
      }
    );
  }

  postAForum(): void {
    this.databaseService.postAForum(this.formGroup.value).subscribe(
      (d) => {
        console.log(d);
        this.formGroup.reset();
        this.getAllForums();
      },
      (error) => {
        if (error.status === 500) {
          this.appComp.logout();
        }
      }
    );
  }

  onDeleteForum(id: any): void {
    console.log(id);
    this.databaseService.deleteAForum(id).subscribe(
      (data) => {
        console.log('Deleted Forum');
        this.getAllForums();
      },
      (error) => {
        if (error.status === 500) {
          this.appComp.logout();
        }
      }
    );
  }
}
