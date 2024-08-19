import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { CategoryService } from 'src/services/api/category.service';
import { PostsService } from 'src/services/api/posts.service';
import { RemovePrefixPipe } from 'src/app/remove-prefix.pipe';
import { createMessage } from 'src/app/common/utils/messages';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { postCategory } from '../my-store/my-store.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

export class CreatePostComponent implements OnInit {

  errorObject = {
    title: {
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
  description: string = ''
  categories: postCategory[] = [];
  selectedCatgeories = [];
  selectedThumbnail: string = ''
  uploadProgress = false;
  uploadedFiles: any[] = [];

  loading = false;

  async ngOnInit() {
    await this.getCategories();
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoriesApi: CategoryService,
    private postsService: PostsService,
    private message: NzMessageService,
    private router: Router
  ) {}

  onTitleChange(e: any) {
    if(this.title.length) {
      this.errorObject.title.show = false
    }
  }

  onCategory() {
    if(this.selectedCatgeories.length) {
      this.errorObject.categorie.show = false
    }
  }

  onSelectThumbnail() {
    if(this.selectedThumbnail.length) {
      this.errorObject.thumbnail.show = false
    }
  }

  async getCategories() {
    try {
      const response = await this.categoriesApi.getAllCategories();
      if (response) {
        this.categories = response.body;
      }
    } catch (e) {
      console.log('Get categories error', e);
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

    if(!this.title || this.title.trim() === '') {
      this.errorObject.title.show = true
      return false
    } else {
      this.errorObject.title.show = false
    }

    if(!this.selectedCatgeories || !this.selectedCatgeories.length) {
      this.errorObject.categorie.show = true
      return false
    } else {
      this.errorObject.categorie.show = false
    }

    if(!this.uploadedFiles || !this.uploadedFiles.length) {
      this.errorObject.files.show = true
      return false
    } else {
      this.errorObject.files.show = false;
    }

    if(!this.selectedThumbnail || this.selectedThumbnail.trim() === '') {
      this.errorObject.thumbnail.show = true
      return false
    } else {
      this.errorObject.thumbnail.show = false;
    }

    return true
  }

  async submitForm(): Promise<void> {



    if(this.validate()) {
      try {

        const formData = {
          title: this.title,
          description: this.description,
          categories: this.selectedCatgeories,
          files: this.uploadedFiles,
          thumbnail: this.selectedThumbnail
        }

        const response = await this.postsService.createPost(formData);
        if(response) {
          createMessage(this.message, response.status, response.message as string)
          if(response.status === 'success') {
            setTimeout(() => {
              this.router.navigate(['/designer-digest/designer/my-store'])
            }, 1500)
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
    if(file.url === this.selectedThumbnail) {
      this.selectedThumbnail = ''
    }
  }

}
