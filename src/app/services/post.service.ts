import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private API: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.API);
  }

  getPostsByUser(u: User): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.API}?userId=${u.id}`);
  }
}
