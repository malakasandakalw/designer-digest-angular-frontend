import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/common/interfaces/CommonInterface';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { post } from 'src/app/secured/designer/my-store/my-store.component';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { PostsService } from 'src/services/api/posts.service';
import { CommonModule } from '@angular/common';
import { postCategory } from 'src/app/secured/designer/my-store/my-store.component';
import { CategoryService } from 'src/services/api/category.service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-single-post-card-common',
  templateUrl: './single-post-card.component.html',
  styleUrls: ['./single-post-card.component.css'],
  standalone: true,
  imports: [NzCardModule, NzGridModule, CommonModule, NzIconModule, NzButtonModule, NzTagModule, NzToolTipModule, NzAvatarModule]
})
export class SinglePostCardComponent {
  @Input({required: true}) post: post | null = null
  @Output() triggerVote = new EventEmitter<boolean>();
  
  get currentUser() {
    return this.apiAuthService.getCurrentUser().user
  }

  constructor(
    private postsService: PostsService,
    private router: Router,
    private apiAuthService: ApiAuthService
  ) {

  }

  async upvoteTrigger(postId: string) {
    try{
      const response = await this.postsService.triggerUpvote(postId);
      if (response && response.body.postupvoted) {
        console.log(response.body.postupvoted)
        if(response.body.postupvoted.user_id === this.currentUser.id) {
          // const post = this.posts.find(post => post.post_id === response.body.postupvoted.post_id);
          if(this.post) {
            this.post.user_has_voted = response.body.postupvoted.voted
            this.post.upvote_count = response.body.postupvoted.voted ? (parseInt(this.post.upvote_count) + 1).toString() : (parseInt(this.post.upvote_count) - 1).toString()
            this.triggerVote.emit(response.body.postupvoted.voted)
          }
        }
        // this.totalPosts = response.body.result.total
        // this.posts = response.body.result.posts;
      }
    }catch(error) {
      console.log(error)
    }
  }

  navigateToPost(postId: string) {
    this.router.navigate([`/all-posts/${postId}`])
  }

  navgiateToSingleDesigner(designerId: string) {
    if(!designerId) return
    this.router.navigate([`/designers/${designerId}`])
  }

  navgiateToSingleCategory(id: string) {
    if(!id) return
    this.router.navigate([`/categories/${id}`])
  }
}
