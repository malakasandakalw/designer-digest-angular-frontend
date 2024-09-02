import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/services/api/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent  implements OnInit {
  id: string | null = null;
  loading = false

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  async getPost() {
    if(!this.id) return
    
    try {
      this.loading = true
      const response = await this.postsService.getPostById(this.id);
      if (response) {
        console.log(response)
      }
      this.loading = false
    } catch (error) {
      console.log(error)
    }
  }

}