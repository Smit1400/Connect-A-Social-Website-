import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  forum;
  forumId;
  username;
  name;
  email;
  question;
  description;
  comments;
  formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private appComp: AppComponent
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('forumId');
    this.forumId = id;
    this.getForumData();
    this.initForm();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      comment: new FormControl('', [Validators.required]),
    });
  }

  getForumData(): void {
    this.databaseService.getForumData(this.forumId).subscribe(
      (result) => {
        console.log('result = ' + result.forum);
        this.forum = result.forum;
        this.name = result.forum.creator.name;
        this.username = result.forum.creator.username;
        this.email = result.forum.creator.email;
        this.question = result.forum.question;
        this.description = result.forum.description;
        this.comments = result.forum.comments;
        this.forumId = result.forum._id;
        console.log(this.forum);
      },
      (error) => {
        if (error.status === 500) {
          this.appComp.logout();
        }
      }
    );
  }

  postAComment(): void {
    if (this.formGroup.valid) {
      const data = {
        comment: this.formGroup.value.comment,
        fromId: localStorage.getItem('userId'),
        id: this.forumId,
      };
      console.log(data);
      this.formGroup.reset();
      this.databaseService.postAComment(data).subscribe(
        (result) => {
          console.log(result);
          this.getForumData();
        },
        (error) => {
          if (error.status === 500) {
            this.appComp.logout();
          } else {
            console.log(error.message);
          }
        }
      );
    } else {
      console.log('Validation error.');
    }
  }
}
