import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISize } from '../Models/isize';
import { Observable } from 'rxjs';
import { ApiColor } from '../Models/api-color';
import { ApiIsize } from '../Models/api-isize';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  private apiUrl = 'http://localhost:5025/api/ColorAndSize/';

 constructor(private http: HttpClient) { }





 getAllSizes(): Observable<ApiIsize> {
    return this.http.get<ApiIsize>(`${this.apiUrl}GetAllSize`);
 }

 createSize(size: ISize): Observable<ApiIsize> {
    return this.http.post<ApiIsize>(`${this.apiUrl}AddSize`, size);
 }

 deleteSize(): Observable<ApiIsize[]> {
    return this.http.delete<ApiIsize[]>(`${this.apiUrl}/sDeleteSize`);
  }

  deleteColor(Sizid: number): Observable<ApiIsize> {
    const url = `http://localhost:5025/api/ColorAndSize/sDeleteSize`;
    const body = {
       id: Sizid,
      name: "string",
      code:"string",
       notActive: true
    };
    const options = {
       headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
       body: body
    };

    return this.http.request<ApiIsize>('DELETE', url, options);
   }

}
