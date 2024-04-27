import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/iproduct';
import { environment } from '../../environments/environment.development';
import { ApiIProduct } from '../Models/api-iproduct';
import { Igetproduct } from '../Models/IGetProduct';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {
  constructor(private http: HttpClient) { }

  createProduct(formData: FormData): Observable<IProduct> {
    return this.http.post<IProduct>(`${environment.apiUrl}/api/Product/CreateProductWithImage`, formData);
  }

  getAllProducts(): Observable<ApiIProduct> {
    return this.http.get<ApiIProduct>(`${environment.apiUrl}/api/Product/getAllProducts`);
  }

  getAllProductsWithPaging(page: number, itemsPerPage: number): Observable<ApiIProduct> {
    return this.http.get<ApiIProduct>(`${environment.apiUrl}/api/Product/getAllProductsWithPaging/${page}/${itemsPerPage}`);
  }


  getProductById(productId: number): Observable<Igetproduct> {
    return this.http.get<Igetproduct>(`${environment.apiUrl}/api/product/GetProductByID/${productId}`);
  }


  getProductsByCategoryID(pageNumber: number, categoryId: number, items: number): Observable<ApiIProduct> {
    let params = new HttpParams()
      .set('catID', categoryId.toString())
      .set('items', items.toString());
    return this.http.get<ApiIProduct>(`${environment.apiUrl}/api/Product/getProductsByCategoryID/${pageNumber}`, { params });
  }


  updateProduct(productId: number, formData: FormData): Observable<any> {
    const params = new HttpParams()
      .set('Id', productId.toString())
      .set('Title', formData.get('title')?.toString() ?? '')
      .set('IsApproved', formData.get('isApproved')?.toString() ?? '')
      .set('productGender', formData.get('productGender')?.toString() ?? '')
      .set('categoryID', formData.get('categoryId')?.toString() ?? '')
      .set('Code', formData.get('code')?.toString() ?? '')
      .set('Description', formData.get('description')?.toString() ?? '')
      .set('VendorId', formData.get('vendorId')?.toString() ?? '');

    const url = `${environment.apiUrl}/api/Product?${params.toString()}`;

    return this.http.put(url, formData);
  }


  SDelete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/Product/deleteProduct/${id}`);
  }
}
