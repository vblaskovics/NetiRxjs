import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, switchMap } from 'rxjs';
import { Post } from '../interfaces/post';
import { Todo } from '../interfaces/todo';
import { User } from '../interfaces/user';
import { PostService } from '../services/post.service';
import { TodoService } from '../services/todo.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-biz-counter',
  templateUrl: './biz-counter.component.html',
  styleUrls: ['./biz-counter.component.css'],
})
export class BizCounterComponent implements OnInit {
  userId: number | undefined;
  user$: Observable<User> = new Observable<User>();
  userEmail$: Observable<string> = new Observable<string>();
  userPostsCount$: Observable<number> = new Observable<number>();
  userTodosCount$: Observable<number> = new Observable<number>();

  constructor(
    private userService: UserService,
    private postService: PostService,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {}

  userInputChange() {
    if (!this.userId) return;
    this.user$ = this.userService.getUserById(this.userId);
    this.userEmail$ = this.user$.pipe(map((u: User) => u.email));

    this.userPostsCount$ = this.user$.pipe(
      filter((u: User) => u.email.endsWith('.biz')),
      switchMap((u: User) => this.postService.getPostsByUser(u)),
      map((posts: Post[]) => posts.length)
    );

    this.userTodosCount$ = this.user$.pipe(
      filter((u: User) => !u.email.endsWith('.biz')),
      switchMap((u: User) => this.todoService.getTodosByUser(u)),
      map((todos: Todo[]) => todos.length)
    );

  }
}
