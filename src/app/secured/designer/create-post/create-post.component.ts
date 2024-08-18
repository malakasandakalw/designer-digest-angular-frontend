import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { CategoryService } from 'src/services/api/category.service';
import { PostsService } from 'src/services/api/posts.service';
import { RemovePrefixPipe } from 'src/app/remove-prefix.pipe';


export interface category {
  id: string,
  name: string
}

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
    }
  }

  showMultipleFileMessage = false;

  title: string = ''
  description: string = ''
  categories: category[] = [];
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
    private postsService: PostsService
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
        
        console.log(formData)

        // const response = await this.postsService.createPost(formData);

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

}
