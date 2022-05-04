import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'; //HttpHeaders
import { Member } from '../_models/member';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

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
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers() {
    if (this.members.length > 0) return of(this.members);
    // return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions);
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username: string) {
    const member = this.members.find(x => x.username === username);
    if (member !== undefined) return of(member);
    //return this.http.get<Member>(this.baseUrl + 'users/' + username, httpOptions);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }
}

// getMembers() {
//   // return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions);
//   return this.http.get<Member[]>(this.baseUrl + 'users');
// }

// getMember(username: string) {
//   //return this.http.get<Member>(this.baseUrl + 'users/' + username, httpOptions);
//   return this.http.get<Member>(this.baseUrl + 'users/' + username);
// }