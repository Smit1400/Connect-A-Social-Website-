import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.http.get('http://localhost:3000/posts/', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  createPost(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/posts/', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  likePost(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/like/', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  unlikePost(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/unlike/', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  deletePost(id: any): Observable<any> {
    return this.http.delete('http://localhost:3000/delete-post/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}
