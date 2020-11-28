import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  getAllForums(): Observable<any> {
    return this.http.get('http://localhost:3000/display/', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  postAForum(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/forum/', data, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  deleteAForum(id: any): Observable<any> {
    return this.http.delete('http://localhost:3000/delete-question/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getForumData(id: any): Observable<any> {
    return this.http.post(
      'http://localhost:3000/single-forum/',
      { forumId: id },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  postAComment(data: any): Observable<any> {
    return this.http.put('http://localhost:3000/edit-question/', data, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}
