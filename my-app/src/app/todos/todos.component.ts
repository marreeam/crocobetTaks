import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TodosComponent implements OnInit {
  todos: any[] = [];
  userId: number | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = +id;
        this.http.get<any[]>(`https://jsonplaceholder.typicode.com/todos?userId=${this.userId}`).subscribe(data => {
          this.todos = data;
        });
      }
    });
  }
}


