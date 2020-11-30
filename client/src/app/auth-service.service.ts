import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  loginService(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/login/', data);
  }

  signUpService(data: any): Observable<any> {
    return this.http.put('http://localhost:3000/signup/', data);
  }
}
