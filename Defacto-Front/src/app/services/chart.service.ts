import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartResponce } from '../Models/chart-responce';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }
  private apiUrl2 = 'http://localhost:5025/api/Product/getProductsByCategoryID';
  private apiUrl = 'http://localhost:5025/api/Order/getDefactoOrders';

  getAllUsers():Observable<ChartResponce> {
    return this.http.get<ChartResponce>('http://localhost:5025/api/User/GetAllUsers');
  }

  getOrders(items: number, pageNo: number): Observable<any> {
    const params = { items, pageNo };
    return this.http.get<any>(this.apiUrl, { params });
  }


  getProductsByCategoryID(catID: number, items: number): Observable<any> {
    return this.http.get(`${this.apiUrl2}/${catID}?catID=${catID}&items=${items}`);
 }
}
