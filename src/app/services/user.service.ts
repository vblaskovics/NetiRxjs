import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API:string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private httpClient: HttpClient) { }

  getUsers() : Observable<User[]> {
    return this.httpClient.get<User[]>(this.API);
  }

  getUserById(userId:number): Observable<User> {
    return this.httpClient.get<User>(`${this.API}/${userId}`);
  }

}
