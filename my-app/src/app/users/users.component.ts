import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  searchText: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').subscribe(data => {
      this.users = data;
    });
  }

  filteredUsers() {
    return this.users.filter(user => {
      const searchTerm = this.searchText.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    });
  }

  viewTodos(userId: number) {
    this.router.navigate(['/todos', userId]);
  }

  viewPosts(userId: number) {
    this.router.navigate(['/posts', userId]);
  }
}





