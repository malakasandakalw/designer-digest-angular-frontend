import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Editor, Toolbar } from 'ngx-editor';
import { createMessage } from 'src/app/common/utils/messages';
import { CategoryService } from 'src/services/api/category.service';
import { PostsService } from 'src/services/api/posts.service';
import { postCategory } from '../my-store/my-store.component';
import { PostCategory } from 'src/app/common/interfaces/CommonInterface';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit, OnDestroy {

  id: string | null = null

  errorObject = {
    title: {
      show: false
    },
    description: {
      show: false
    },
    categorie: {
      show: false
    },
    files: {
      show: false
    },
    thumbnail: {
      show: false
    }
  }

  showMultipleFileMessage = false;

  title: string = ''
  editor: Editor | null = null;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline'],
    ['bullet_list'],
    ['link'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  description: string = ''
  categories: postCategory[] = [];
  selectedCatgeories: string[] = [];
  selectedThumbnail: string = ''
  uploadProgress = false;
  uploadedFiles: any[] = [];

  loading = false;
  loadingCategories = false

  async ngOnInit() {
    this.editor = new Editor();
    this.getCategories().then(() => this.getPostById())
      .catch(error => {
        console.error('Error occurred:', error);
      });
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoriesApi: CategoryService,
    private postsService: PostsService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  onTitleChange(e: any) {
    if (this.title.length) {
      this.errorObject.title.show = false
    }
  }

  onDescriptionChange(e: any) {
    if (this.description && this.description.trim() !== '<p></p>') {
      this.errorObject.description.show = false
    }
  }

  onCategory() {
    if (this.selectedCatgeories.length) {
      this.errorObject.categorie.show = false
    }
  }

  onSelectThumbnail() {
    if (this.selectedThumbnail.length) {
      this.errorObject.thumbnail.show = false
    }
  }

  async getCategories() {
    try {
      this.loadingCategories = true
      const response = await this.categoriesApi.getAllCategories();
      if (response) {
        this.categories = response.body;
      }
    } catch (e) {
      console.log('Get categories error', e);
    } finally {
      this.loadingCategories = false
    }
  }

  async getPostById() {
    if (!this.id) return
    try {
      this.loading = true
      const response = await this.postsService.getPostById(this.id)
      if (response && response.body.result) {
        this.title = response.body.result.title
        this.description = response.body.result.description

        this.selectedCatgeories = this.categories.filter(category =>
          response.body.result.categories.some((c: PostCategory) => c.id === category.id)
        ).map(category => category.id);

        this.uploadedFiles = response.body.result.media.map((media: any) => ({
          name: media.media_url.replace("/uploads/", ""),
          url: media.media_url
        }));

        this.selectedThumbnail = response.body.result.thumbnail.media_url;

      }
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }

  async deletePost() {
    if (!this.id) return
    try {
      this.loading = true
      try {
        const formData = {
          id: this.id
        }

        const response = await this.postsService.deletePost(formData);
        if (response) {
          createMessage(this.message, response.status, response.message as string)
          if (response.status === 'success') {
            setTimeout(() => {
              this.router.navigate(['/designer-digest/designer/my-store'])
            }, 800)
          }
        }
      } catch (e) {
        console.log('Create post error', e);
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }

  isValidFileType(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm', 'video/ogg'];
    return validTypes.includes(file.type);
  }

  generatePreview(file: File): string {
    return URL.createObjectURL(file);
  }

  validate() {

    if (!this.title || this.title.trim() === '') {
      this.errorObject.title.show = true
      return false
    } else {
      this.errorObject.title.show = false
    }

    if (!this.description || this.description.trim() === '<p></p>') {
      this.errorObject.description.show = true
      return false
    } else {
      this.errorObject.description.show = false
    }

    if (!this.selectedCatgeories || !this.selectedCatgeories.length) {
      this.errorObject.categorie.show = true
      return false
    } else {
      this.errorObject.categorie.show = false
    }

    if (!this.selectedThumbnail || this.selectedThumbnail.trim() === '') {
      this.errorObject.thumbnail.show = true
      return false
    } else {
      this.errorObject.thumbnail.show = false;
    }

    return true
  }

  async submitForm(): Promise<void> {

    if (this.validate()) {
      try {
        const formData = {
          id: this.id,
          title: this.title,
          description: this.description,
          categories: this.selectedCatgeories,
          thumbnail: this.selectedThumbnail
        }

        const response = await this.postsService.updatePost(formData);
        if (response) {
          createMessage(this.message, response.status, response.message as string)
          if (response.status === 'success') {
            setTimeout(() => {
              this.router.navigate(['/designer-digest/designer/my-store'])
            }, 800)
          }
        }
      } catch (e) {
        console.log('Create post error', e);
      }
    }
  }


  onProgressUpdate(progress: boolean) {
    this.uploadProgress = progress;
  }

  onUploadComplete(files: any[]) {
    this.uploadedFiles = files;
    this.selectedThumbnail = this.uploadedFiles[0].url
  }

  onUploadError(error: string) {
    console.error('Upload Error:', error);
  }

  removeFile(file: any) {
    this.uploadedFiles = this.uploadedFiles.filter((file_) => file_.url !== file.url)
    if (file.url === this.selectedThumbnail) {
      this.selectedThumbnail = ''
    }
  }

}
