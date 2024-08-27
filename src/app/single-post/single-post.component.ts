import { Component, OnInit } from '@angular/core';
import { postMedia, postThumbnail, postCategory } from '../secured/designer/my-store/my-store.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/services/api/posts.service';
import { ApiAuthService } from 'src/services/api/api-auth.service';

export interface SinglePost {
  post_id: string,
  title: string,
  description: string,
  created_by: {
    id: string,
    first_name: string,
    last_name: string,
    profile_picture: string,
    email: string
  },
  media: postMedia[],
  thumbnail: postThumbnail,
  categories: postCategory[],
  upvote_count: string,
  user_has_voted?: boolean
  created_at: string,
}

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponentPublic implements OnInit{
  loading = false
  id: string | null = null
  post: SinglePost | null = null

  get currentUser() {
    return this.apiAuthService.getCurrentUser().user
  }

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private apiAuthService: ApiAuthService,
    private router: Router
  ){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getPost()
  }

  async getPost() {
    if(!this.id) return
    
    try {
      this.loading = true
      const user_id = this.currentUser ? this.currentUser.id : null
      const response = await this.postsService.getFullPostById(this.id, user_id);
      if (response) {
        this.post = response.body.result
      }
      this.loading = false
    } catch (error) {
      console.log(error)
    }
  }

  async upvoteTrigger(postId: string) {

    if(!this.currentUser) {
      this.router.navigate(['/auth/login']);
    } else {
      try{
        const response = await this.postsService.triggerUpvote(postId);
        if (response && response.body.postupvoted && this.post) {
          if(response.body.postupvoted.user_id === this.currentUser.id) {
            this.post.user_has_voted = response.body.postupvoted.voted
            this.post.upvote_count = response.body.postupvoted.voted ? (parseInt(this.post.upvote_count) + 1).toString() : (parseInt(this.post.upvote_count) - 1).toString()
          }
        }
      }catch(error) {
        console.log(error)
      }
    }
  }

}
