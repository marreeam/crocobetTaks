import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  userId: number | null = null;
  selectedPost: any | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = +id;
        this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts?userId=${this.userId}`).subscribe(data => {
          this.posts = data;
        });
      } else {
        this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts').subscribe(data => {
          this.posts = data;
        });
      }
    });
  }

  openModal(post: any) {
    this.selectedPost = post;
  }

  closeModal() {
    this.selectedPost = null;
  }
}



