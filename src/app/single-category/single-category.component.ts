import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { PostsService } from 'src/services/api/posts.service';
import { post } from '../secured/designer/my-store/my-store.component';
import { CategoryService } from 'src/services/api/category.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { createMessage } from '../common/utils/messages';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent {
  loading = false
  id: string | null = null

  totalPosts = 0;
  pageIndex = 1;
  pageSize = 20;

  selectedCategories: string[] = []
  orderBy: string = 'recent'
  searchText: string = ''

  posts: post[] = []

  category: string = ''

  get currentUser() {
    return this.apiAuthService.getCurrentUser().user
  }


  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router,
    private apiAuthService: ApiAuthService,
    private categoryService: CategoryService,
    private message: NzMessageService,
  ){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }
  
  async ngOnInit(): Promise<void> {
    await this.getCategory();
    await this.getPosts()
  }

  async getCategory() {
    if(!this.id) return
    try {
      this.loading = true
      const response = await this.categoryService.getCategory(this.id);
      if (response) {
        console.log(response)
        this.category = response.body.name
      }
      this.loading = false
    } catch (error) {
      console.log(error)
    }
  }

  async getPosts() {
    if(!this.id) return
    try {
      this.loading = true
      const filterData = {
        categories: [this.id],
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

  async upvoteTrigger(postId: string) {
    if(!this.currentUser) {
      this.router.navigate(['/auth/login']);
    } else {
    try{
      const response = await this.postsService.triggerUpvote(postId);
      if (response && response.body.postupvoted) {
        console.log(response.body.postupvoted)
        if(response.body.postupvoted.user_id === this.currentUser.id) {
          const post = this.posts.find(post => post.post_id === response.body.postupvoted.post_id);
          if(post) {
            post.user_has_voted = response.body.postupvoted.voted
            post.upvote_count = response.body.postupvoted.voted ? (parseInt(post.upvote_count) + 1).toString() : (parseInt(post.upvote_count) - 1).toString()
            createMessage(this.message, response.status, response.body.postupvoted.voted ? `You upvoted ${post.title}!` : `You have removed your vote from ${post.title}`)
          }
        }
        // this.totalPosts = response.body.result.total
        // this.posts = response.body.result.posts;
      }
    }catch(error) {
      console.log(error)
    }
  }
  }

  async onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex
    await this.getPosts();
  }

}
