import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { PostsService } from 'src/services/api/posts.service';
import { post } from '../secured/designer/my-store/my-store.component';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  
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

  async onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex
    await this.getPosts();
  }

  async onPageSizeChange(size: number) {
    this.pageSize = size
    await this.getPosts()

  }

}