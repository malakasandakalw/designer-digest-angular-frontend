import { Component } from '@angular/core';
import { Post } from 'src/app/common/interfaces/CommonInterface';
import { SinglePostCardComponent } from "../single-post-card/single-post-card.component";
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-posts-cards-horizontal',
  templateUrl: './posts-cards-horizontal.component.html',
  styleUrls: ['./posts-cards-horizontal.component.css'],
  standalone: true,
  imports: [SinglePostCardComponent, CommonModule, NzGridModule]
})


export class PostsCardsHorizontalComponent {
  
  posts: Post[] = [
    {
      id: '1',
      title: 'Card Title Here',
      type: 'IMAGE',
      media_url: '',
      upvotes: 0,
      categories: [{id: '', name: ''}],
      created_at: '2024-08-04',
      created_by: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        is_verified: true
      },
    },
    {
      id: '2',
      title: 'Card Title Here',
      type: 'IMAGE',
      media_url: '',
      upvotes: 0,
      categories: [{id: '', name: ''}],
      created_at: '2024-08-04',
      created_by: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        is_verified: true
      }
    },
    {
      id: '3',
      title: 'Card Title Here',
      type: 'IMAGE',
      media_url: '',
      upvotes: 0,
      categories: [{id: '', name: ''}],
      created_at: '2024-08-04',
      created_by: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        is_verified: true
      }
    },
    {
      id: '3',
      title: 'Card Title Here',
      type: 'IMAGE',
      media_url: '',
      upvotes: 0,
      categories: [{id: '', name: ''}],
      created_at: '2024-08-04',
      created_by: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        is_verified: true
      }
    }
  ]

}
