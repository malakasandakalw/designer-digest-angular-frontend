import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { CategoryService } from 'src/services/api/category.service';
import { PostsService } from 'src/services/api/posts.service';
import { post } from '../secured/designer/my-store/my-store.component';
import { DesignerService } from 'src/services/api/designer.service';
import { Designer } from '../designers/designers.component';
import { createMessage } from '../common/utils/messages';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-single-designer',
  templateUrl: './single-designer.component.html',
  styleUrls: ['./single-designer.component.css']
})
export class SingleDesignerComponent implements OnInit {
  loading = false
  id: string | null = null

  posts: post[] = []
  designer: Designer | null = null

  totalPosts = 0;
  pageIndex = 1;
  pageSize = 20;

  selectedCategories: string[] = []
  orderBy: string = 'recent'
  searchText: string = ''

  get currentUser() {
    return this.apiAuthService.getCurrentUser().user
  }

  get isDesigner() {
    if(this.currentUser) return this.apiAuthService.isDesigner()
    return false
  }

  get isEmployer() {
    if(this.currentUser) return this.apiAuthService.isEmployer()
    return false
  }

  get isPersonal() {
    if(this.currentUser) return this.apiAuthService.isPersonal()
    return false
  }

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router,
    private apiAuthService: ApiAuthService,
    private categoryService: CategoryService,
    private designerService: DesignerService,
    private message: NzMessageService,
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  
  async ngOnInit(): Promise<void> {
    await this.getDesignerDataById()
    await this.getPostsByDesignerId()
  }

  async getDesignerDataById() {
    if(!this.id) return
    try {
      this.loading = true
      const response = await this.designerService.getDesignerDataById(this.id, this.currentUser?.id ? this.currentUser.id : null);
      if (response) {
        this.designer = response.body.result
      }
      this.loading = false
    } catch (error) {
      console.log(error)
      this.loading = false
    }
  }

  async getPostsByDesignerId() {
    try {
      this.loading = true
      const filterData = {
        designer_id: this.id,
        categories: this.selectedCategories,
        order_by: this.orderBy,
        search: this.searchText,
        page_index: this.pageIndex,
        page_size: this.pageSize,
        user_id: this.currentUser?.id ? this.currentUser.id : null
      }
      const response = await this.postsService.getPostsByDesignerId(filterData);
      if (response) {
        this.totalPosts = response.body.result.total
        this.posts = response.body.result.posts;
      }
      this.loading = false
    } catch (error) {
      console.log(error)
      this.loading = false
    }
  }

  async onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex
    await this.getPostsByDesignerId();
  }

  async onFilterCategoryChange(value: string[]) {
    this.selectedCategories = value
    await this.getPostsByDesignerId()
  }

  async onOrderByChange(value: string) {
    this.orderBy = value
    await this.getPostsByDesignerId()
  }

  async onSearchChange(value: string) {
    this.searchText = value
    await this.getPostsByDesignerId()
  }

  chatTrigger() {

    if(this.currentUser.id === this.designer?.user_id) return

    if(!this.currentUser) {
      this.router.navigate(['/auth/login']);
    } else {
      if(!this.designer) return
      try{
        if(this.isDesigner) {
          this.router.navigate(['/designer-digest/designer/chats/'+this.designer.user_id]);
        }
        
        if(this.isEmployer) {
          this.router.navigate(['/designer-digest/employer/chats/'+this.designer.user_id]);
        }

        if(this.isPersonal) {
          this.router.navigate(['/designer-digest/personal/chats/'+this.designer.user_id]);
        }

      }catch(error) {
        console.log(error)
      }
    }
  }

  async followTrigger() {
    if(!this.currentUser) {
      this.router.navigate(['/auth/login']);
    } else {
      if(!this.id || this.id === this.currentUser.id) return
      try{
        const response = await this.designerService.follow(this.id);
        if (response && response.body.followed && this.designer) {
          this.designer.user_has_followed = response.body.followed.followed
          this.designer.follow_count = response.body.followed.followed ? this.designer.follow_count + 1 : this.designer.follow_count - 1
          createMessage(this.message, response.status, response.body.followed.followed ? `Now you are following ${this.designer.first_name}!` : `You have unfollowed ${this.designer.first_name}`)
        }
      }catch(error) {
        console.log(error)
      }
    }
  }

  triggerVoteChange(voted: boolean) {
    if(!this.designer) return
    if(voted) {
      this.designer.upvotes_count = this.designer.upvotes_count + 1
    } else {
      this.designer.upvotes_count = this.designer.upvotes_count - 1
    }
  }

  navgiateToSingleDesignerCategory(categoryId: string) {
    if(!categoryId) return
    this.router.navigate([`/designers/category/${categoryId}`]);
  }

}
