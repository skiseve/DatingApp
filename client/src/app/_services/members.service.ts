import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'; //HttpHeaders
import { Member } from '../_models/member';

// REMOVED as jwt interceptor will add the authorization headers
// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers() {
    // return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions);
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username: string) {
    //return this.http.get<Member>(this.baseUrl + 'users/' + username, httpOptions);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
}
