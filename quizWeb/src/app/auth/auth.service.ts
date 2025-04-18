import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // HttpClient import
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL: string = 'http://localhost:5000/';  // Correct API endpoint

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',    // Ensure backend accepts JSON
      'Content-Type': 'application/json'  // Content type as JSON
    });

    return this.http.post(`${this.BASE_URL}api/auth/sign-up`, data, { headers });
  }
  login(loginRequest: any): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',    // Ensure backend accepts JSON
      'Content-Type': 'application/json'  // Content type as JSON
    });
  
    return this.http.post(`${this.BASE_URL}api/auth/login`, loginRequest, { headers });
  }
  
}
