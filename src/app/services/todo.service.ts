import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../interfaces/todo';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private API: string = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private httpClient: HttpClient) {}

  getTodosByUser(u: User): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${this.API}?userId=${u.id}`);
  }
}
