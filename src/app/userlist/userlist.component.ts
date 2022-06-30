import { Component, OnInit } from '@angular/core';
import { firstValueFrom, forkJoin, map, Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { User } from '../interfaces/user';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

type Card = {
  name: string;
  email: string;
  postCount: number;
};

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  users: User[] = [];
  posts: Post[] = [];
  cards: Card[] = [];

  users$: Observable<User[]> = new Observable<User[]>();
  posts$: Observable<Post[]> = new Observable<Post[]>();
  cards$: Observable<Card[]> = new Observable<Card[]>();

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    // this.initCardsWithSubscribes();
    // this.initCardsWithAsyncAwait();
    this.initCardsWithForkJoin();
  }

  initCardsWithSubscribes() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.postService.getPosts().subscribe((posts: Post[]) => {
        this.posts = posts;

        this.users.forEach((u: User) => {
          let postCount = this.posts.filter(
            (p: Post) => p.userId === u.id
          ).length;
          this.cards.push({
            name: u.name,
            email: u.email,
            postCount,
          });
        });
      });
    });
  }

  async initCardsWithAsyncAwait() {
    this.users = await firstValueFrom(this.userService.getUsers());
    this.posts = await firstValueFrom(this.postService.getPosts());

    this.users.forEach((u: User) => {
      let postCount = this.posts.filter((p: Post) => p.userId === u.id).length;
      this.cards.push({
        name: u.name,
        email: u.email,
        postCount,
      });
    });
  }

  initCardsWithForkJoin() {
    this.users$ = this.userService.getUsers();
    this.posts$ = this.postService.getPosts();

    this.cards$ = forkJoin({
      users: this.users$,
      posts: this.posts$
    }).pipe(
      map((res) => {
        let cards:Card[] = [];
        res.users.forEach((u: User) => {
          let postCount = res.posts.filter(
            (p: Post) => p.userId === u.id
          ).length;
          cards.push({
            name: u.name,
            email: u.email,
            postCount,
          });
        });
        return cards;
      })
    );
  }


}
