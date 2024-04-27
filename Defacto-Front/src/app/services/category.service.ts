import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ICategory } from '../Models/icategory';
import { ICategoryResponse } from '../Models/icategory-response';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getAll(): Observable<ICategoryResponse[]> {
    return this.http.get<ICategoryResponse[]>(`${this.apiUrl}/api/Category`);
  }


  createCategory(formData: FormData): Observable<ICategory> {

    return this.http.post<ICategory>(`${this.apiUrl}/api/Category`, formData);
  }


  // updateCategory(categoryId: number, formData: FormData): Observable<ICategory> {
  //   const params = new HttpParams()
  //     //  .set('ID', formData.get('id')?.toString() ?? '')
  //     .set('Name', formData.get('name')?.toString() ?? '')
  //     .set('subCategory', formData.get('subCategory')?.toString() ?? '')
  //     .set('Description', formData.get('description')?.toString() ?? '');

  //   const url = `${this.apiUrl}/api/Category?ID=${categoryId}&${params.toString()}`;

  //   return this.http.put<ICategory>(url, formData);
  // }


  updateCategory(id: number, formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/api/Category?ID=${id}`;
    return this.http.put(url, formData);
  }


  getCategoriesByGender(gender: 'Male' | 'Female' | null, page: number, pageSize: number): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.apiUrl}/categories/gender/${gender}?page=${page}&pageSize=${pageSize}`);
  }

  getCategoryByID(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.apiUrl}/categories/${id}`);
  }

  getAllCategories(page: number, pageSize: number): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.apiUrl}/categories?page=${page}&pageSize=${pageSize}`);
  }


  SDelete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/Category/SoftDelete/${id}`);
  }

  softDelete(id: number): Observable<any> {
    const body = { isDeleted: true };
    return this.http.patch(`${this.apiUrl}/categories/${id}/soft-delete`, body);
  }

}

