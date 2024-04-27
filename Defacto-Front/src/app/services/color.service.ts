import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IColor } from '../Models/icolor';
import { ApiColor } from '../Models/api-color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {


  private apiUrl = 'http://localhost:5025/api/ColorAndSize';


  constructor(private http: HttpClient) { }

  getColors(): Observable<ApiColor> {
    return this.http.get<ApiColor>(`${this.apiUrl}/GetAllColor`);
  }
  createColor(color: ApiColor['entities'][0]): Observable<ApiColor[]> {
    return this.http.post<ApiColor[]>(`${this.apiUrl}/AddColor`, color);
  }



  deleteColor(colorId: number): Observable<ApiColor> {
    const url = `http://localhost:5025/api/ColorAndSize/sDeleteColor`;
    const body = {
       id: colorId,
       name: "string",
       hex: "string",
       rgb: "string",
       notActive: true
    };
    const options = {
       headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
       body: body
    };

    return this.http.request<ApiColor>('DELETE', url, options);
   }


}

