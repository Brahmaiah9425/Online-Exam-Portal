import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const BASIC_URL = "http://localhost:5000/api/test"; 

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  getQuestionsByTest(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  // Default Headers
  private headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  createTest(testData: any): Observable<any> {
    return this.http.post(`${BASIC_URL}`, testData, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  getAllTest(): Observable<any> {
    return this.http.get(`${BASIC_URL}`, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  addQuestionInTest(questionDto: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/questions`, questionDto, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  getTestQuestions(id: number): Observable<any> {
    const url = `${BASIC_URL}/${id}`;
    console.log('Fetching questions from:', url);
    return this.http.get(url, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  getTestResults(): Observable<any> {
    return this.http.get(`${BASIC_URL}/test-result`, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Proper error handling
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error?.message || 'Something went wrong!'));
  }
  getTestsByName(name: string) {
    return this.http.get(`/api/test/search?name=${name}`);
  }
}
