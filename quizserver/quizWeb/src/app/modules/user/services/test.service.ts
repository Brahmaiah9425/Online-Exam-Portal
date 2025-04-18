import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:5000/";

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private http: HttpClient) { }

  getAllTest(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/test');
  }

  getTestQuestions(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/test/${id}`);
  }

  submitTest(data: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/test/submit-test', data);
  }

  getUserTestResults(userId: number): Observable<any> {
    return this.http.get(`${BASIC_URL}api/test/test-result/${userId}`);
  }
  getTestsByName(name: string) {
    return this.http.get(`/api/test/search?name=${name}`);
  }
}
