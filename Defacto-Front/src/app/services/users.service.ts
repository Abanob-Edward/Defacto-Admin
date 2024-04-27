import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../Models/iuser';
import { IApiResponse } from '../Models/iapi-response';


@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private apiUrl = 'http://localhost:5025/api/User/AllUsersPaging';
  private apiUpdated = 'http://localhost:5025/api/User/BlockOrUnBlock';

  constructor(private http: HttpClient) { }

  getAllUsers(page: number, pageSize: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.apiUrl}/${page}/${pageSize}`);
  }
 // private apicreate = `http://localhost:5025/api/Account/addNewUser/`;

  createUser(user: IUser): Observable<any> {
    // Construct the URL with query parameters
    const params = new HttpParams()
      .set('UserName', user.userName)
      .set('Name', user.name)
      .set('Email', user.email)
      .set('StreetAddress', user.streetAddress)
      .set('City', user.city)
      .set('State', user.state)
      .set('ZipCode', user.zipCode)
      .set('Country', user.country)
      .set('password', user.password)
      .set('roleName', user.roleName);

    // Send the POST request with the constructed URL
    return this.http.post(`http://localhost:5025/api/Account/addNewUser/${user.roleName}`, params, { responseType: 'text' });  }



  blockOrUnblockUser(id: string, isBlocked: boolean): Observable<any> {
    const body = { id, isBlocked };
    return this.http.patch(this.apiUpdated, body);
  }

}