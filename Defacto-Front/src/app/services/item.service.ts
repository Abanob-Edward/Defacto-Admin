import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IItem } from '../Models/iitem';
import { ApiItem } from '../Models/api-item';
import { ApiIProduct } from '../Models/api-iproduct';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) { }

  getProductById(productId: number): Observable<ApiIProduct> {
    return this.http.get<ApiIProduct>(`${environment.apiUrl}/api/product/GetProductByID/${productId}`);
  }

  getAllPagination(pageNumber: number, pageSize: number): Observable<ApiItem> {
    const url = `http://localhost:5025/api/Item/getAllItemsWithPaging/${pageNumber}/${pageSize}`;
    return this.http.get<ApiItem>(url);
  }


  getAllItemsWithPaging(page: number, pageSize: number): Observable<ApiItem> {
    const url = `http://localhost:5025/api/Item/getAllItemsWithPaging/${page}/${pageSize}`;
    return this.http.get<ApiItem>(url);
  }


  getItemsByProductId(productId: number, items: number, pagenumber: number): Observable<ApiItem> {
    let params = new HttpParams();
    params = params.set('items', items.toString());
    params = params.set('pagenumber', pagenumber.toString());

    const url = `http://localhost:5025/api/Item/GetItemlistForProduct/${productId}`;
    return this.http.get<ApiItem>(url, { params });
  }


  addItem(item: IItem): Observable<IItem> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    const options = {
      headers: httpHeaders
    };
    return this.http.post<IItem>('http://localhost:5025/api/Item', item, options);
  }

  updateItem(item: IItem): Observable<IItem> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    const options = {
      headers: httpHeaders
    };
    return this.http.put<IItem>('http://localhost:5025/api/Item', item, options);
  }


  SDelete(id: number): Observable<any> {
    return this.http.delete(`http://localhost:5025/api/Item/SoftDelete?itemID=${id}`);
  }


  deleteAll(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/items`);
  }
}
