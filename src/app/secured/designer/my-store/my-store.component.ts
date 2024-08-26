import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  upvote_count: string,
  user_has_voted?: boolean
}
@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.css']
})
export class MyStoreComponent implements OnInit{

  posts: post[] = []
  loading = false

  totalPosts = 0;
  pageIndex = 1;
  pageSize = 20;

  selectedCategories: string[] = []
  orderBy: string = 'recent'
  searchText: string = ''

  constructor(
    private postsService: PostsService,
    private router: Router
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
      this.loading = true
      const filterData = {
        categories: this.selectedCategories,
        order_by: this.orderBy,
        search: this.searchText,
        page_index: this.pageIndex,
        page_size: this.pageSize
      }
      const response = await this.postsService.getPostsByDesigner(filterData);
      if (response) {
        this.totalPosts = response.body.result.total
        this.posts = response.body.result.posts;
      }
      this.loading = false
    } catch (error) {
      console.log(error)
    }
  }

  async onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex
    await this.getPostsByDesigner();
  }

  async onFilterCategoryChange(value: string[]) {
    this.selectedCategories = value
    await this.getPostsByDesigner()
  }

  async onOrderByChange(value: string) {
    this.orderBy = value
    await this.getPostsByDesigner()
  }

  async onSearchChange(value: string) {
    this.searchText = value
    await this.getPostsByDesigner()
  }

  navigateToPost(postId: string) {
    this.router.navigate([`/designer-digest/designer/my-store/${postId}`])
  }

}
