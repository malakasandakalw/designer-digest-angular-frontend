import { Component, OnInit } from '@angular/core';
import { post } from '../secured/designer/my-store/my-store.component';
import { PostsService } from 'src/services/api/posts.service';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/services/api/api-auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  posts: post[] = []
  loading = false

  totalPosts = 0;
  pageIndex = 1;
  pageSize = 20;

  selectedCategories: string[] = []
  orderBy: string = 'recent'
  searchText: string = ''

  get currentUser() {
    return this.apiAuthService.getCurrentUser().user
  }

  constructor(
    private postsService: PostsService,
    private router: Router,
    private apiAuthService: ApiAuthService
  ) {

  }

  async ngOnInit(): Promise<void> {
    await this.getPosts()
  }

  async getPosts() {
    try {
      this.loading = true
      const filterData = {
        categories: this.selectedCategories,
        order_by: this.orderBy,
        search: this.searchText,
        page_index: this.pageIndex,
        page_size: this.pageSize,
        userId: this.currentUser && this.currentUser.id ? this.currentUser.id : null
      }
      const response = await this.postsService.getPosts(filterData);
      if (response) {
        this.totalPosts = response.body.result.total
        this.posts = response.body.result.posts;
      }
      this.loading = false
    } catch (error) {
      console.log(error)
    }
  }

  async onFilterCategoryChange(value: string[]) {
    this.selectedCategories = value
    await this.getPosts()
  }

  async onOrderByChange(value: string) {
    this.orderBy = value
    await this.getPosts()
  }

  async onSearchChange(value: string) {
    this.searchText = value
    await this.getPosts()
  }

  navigateToPost(postId: string) {
    this.router.navigate([`/all-posts/${postId}`])
  }

  navigateToAllPosts() {
    this.router.navigate([`/all-posts`])
  }

}
