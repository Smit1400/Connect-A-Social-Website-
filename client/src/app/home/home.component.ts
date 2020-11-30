declare var require: any
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
const {URL,UPLOAD_PRESET,CLOUD_NAME}=require('../config/keys'); 
import axios from 'axios'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data;
  name;
  email;
  username;
  profession;
  about;
  caption = "";
  imageUrl = "";
  image: File = null
  userid = localStorage.getItem('userId');

  formGroup: FormGroup;
  constructor(
    private postservice: PostService, 
    private router: Router,
    private appComp: AppComponent
    ) { }

  ngOnInit(): void {
    this.getAllPosts();
    this.initForm();
    this.initializeUserData();
  }

  initializeUserData(): void {
    this.email = localStorage.getItem('email');
    this.name = localStorage.getItem('name');
    this.username = localStorage.getItem('username');
    this.profession = localStorage.getItem('profession');
    this.about = localStorage.getItem('about');
    console.log('email = ' + this.email);
    console.log('name = ' + this.name);
  }

  onFileSelected(event){
    this.image=<File>event.target.files[0]
    console.log("Image path==",(this.image))
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      caption: new FormControl('', [Validators.required]),
      image: new FormControl(null),
    });
  }

  getAllPosts(): void {
    this.postservice.getAllPosts().subscribe((d) => {
      this.data = d.posts;
      console.log(d);
    });
  }

  postCreated(){
    const data = new FormData()
    if(this.image!= null){
      data.append("file",this.image)
      data.append("upload_preset",UPLOAD_PRESET)
      data.append("cloud_name",CLOUD_NAME)
      axios.post(URL,data,{headers:{"Content-Type": "multipart/form-data"}})
      .then(res=>res)
      .then(data=>{
        this.imageUrl=data.data.url
        const post={
          content: this.caption,
          imageUrl: this.imageUrl
        }
        this.postservice.createPost(post).subscribe(
          (res) => {
            console.log(res)
            this.formGroup.reset();
            this.getAllPosts();
          
          }
          );    
        this.caption = "";
        this.imageUrl = "";
        this.image = null;
      })
      .catch(err=>{
        console.log(err)
    });
    }
    else{
      const post={
        content: this.caption,
        imageUrl: null
      }
      this.postservice.createPost(post).subscribe(
        (res) => {
          console.log(res)
          this.formGroup.reset();
          this.getAllPosts();
        });
      this.caption = "";
      this.imageUrl = "";
      this.image = null;
    }
  }

  onDeletePost(id: any): void {
    // console.log(id);
    this.postservice.deletePost(id).subscribe(
      (data) => {
        console.log('Deleted Forum');
        this.getAllPosts();
      },
      (error) => {
        if (error.status === 500) {
          this.appComp.logout();
        }
      }
    );
  }

  liked(post){
    if( post.likes.indexOf((this.userid)) !==-1){
      return true
    }
    else{
      return false
    }
  }

  like(post){
    const postId={
      postId:post._id
    }
    // console.log("postId",postId);
    this.postservice.likePost(postId).subscribe(
      (res) => {
        console.log("liked",res);
        post.likes.length++;
        this.getAllPosts();
      }, (error) => {
        console.log(error);
      },
    );
  }

  onCreatePost(){
    this.router.navigate(['/createPost'])
  }

  unlike(post){
    const postId={
      postId:post._id
    }
    this.postservice.unlikePost(postId).subscribe(
      (res) => {
        console.log("unliked",res);
        post.likes.length--;
        this.getAllPosts();
      }, (error) => {
        console.log(error);
      },
    );
  }
}
