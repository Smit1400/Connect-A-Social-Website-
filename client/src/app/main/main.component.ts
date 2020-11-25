import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  data;
  formGroup: FormGroup;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.getAllForums();
    this.initForm();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      question: new FormControl('', [Validators.required, Validators.email]),
      description: new FormControl('', [Validators.required]),
    });
  }

  getAllForums(): void {
    this.databaseService.getAllForums().subscribe((d) => {
      this.data = d.forums;
      console.log(d.forums);
    });
  }

  postAForum(): void {
    this.databaseService.postAForum(this.formGroup.value).subscribe((d) => {
      console.log(d);
      this.formGroup.reset();
      this.getAllForums();
    });
  }
}
