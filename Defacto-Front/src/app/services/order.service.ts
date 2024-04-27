import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../Models/iorder';
import { Observable, map } from 'rxjs';
import { OrderStatus } from '../Models/order-status';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:5025/api/Order/getItemForOrder';
  private apiUrl2 = 'http://localhost:5025/api/Order/getDefactoOrders';
  private apiUrl3 = 'http://localhost:5025/api/Order/changeOrderState';



  constructor(private http: HttpClient) { }
  getItemsForOrder(orderId: number, items: number, pageNo: number): Observable<IOrder> {
    const params = {
      items: items.toString(),
      pageNo: pageNo.toString()
    };
    return this.http.get<IOrder>(`${this.apiUrl}/${orderId}`, { params });
  }


  getOrders(items: number, pageNo: number): Observable<any> {
    return this.http.get(`${this.apiUrl2}?items=${items}&pageNo=${pageNo}`);
  }

  updateOrderStatus(orderId: number, status: OrderStatus): Observable<any> {
    const url = `${this.apiUrl3}/${orderId}?Status=${status}`;
    return this.http.get(url);
  }

}

