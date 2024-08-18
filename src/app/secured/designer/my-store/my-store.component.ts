import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/services/api/posts.service';

export interface postMedia {
  type: string,
  media_url: string,
  is_thumbnail: boolean
}

export interface postThumbnail {
  type: string,
  media_url: string
}

export interface postCategory {
  id: string,
  name: string
}

export interface post {
  post_id: string,
  title: string,
  description?: string,
  created_at: string,
  created_by?: string,
  media: postMedia[],
  thumbnail: postThumbnail,
  categories: postCategory[],
  upvote_count: string
}
@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.css']
})
export class MyStoreComponent implements OnInit{

  posts: post[] = []

  constructor(
    private postsService: PostsService,
  ) {

  }

  async ngOnInit(): Promise<void> {
    try {
      await this.getPostsByDesigner()
    } catch (error) {
      console.log(error)
    }
  }

  async getPostsByDesigner() {
    try {
      const response = await this.postsService.getPostsByDesigner();
      if (response) {
        this.posts = response.body.result;
      }
    } catch (error) {
      console.log(error)
    }
  }

}
