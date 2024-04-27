import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiReview } from '../Models/api-review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:5025/api/Review';

  constructor(private http: HttpClient) { }

  getReviews(pro_id: number): Observable<ApiReview> {
    return this.http.get<ApiReview>(`${this.apiUrl}?pro_id=${pro_id}`);
  }

  getallReviews(): Observable<ApiReview> {
    return this.http.get<ApiReview>(`${this.apiUrl}/getAllReview`);
  }

}
