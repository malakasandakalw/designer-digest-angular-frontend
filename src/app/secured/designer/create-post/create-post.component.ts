import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { CategoryService } from 'src/services/api/category.service';
import { PostsService } from 'src/services/api/posts.service';

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
    categorie: {
      show: false
    },
    files: {
      show: false
    }
  }

  showMultipleFileMessage = false;

  createPostForm: FormGroup<{
    title: FormControl<string | null>;
  }>;

  categories: category[] = [];
  selectedCatgeories = [];
  selectedFiles: File[] = [];
  previewFiles: any[] = []

  loading = false;

  async ngOnInit() {
    await this.getCategories();
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoriesApi: CategoryService,
    private postsService: PostsService
  ) {
    this.createPostForm = this.formBuilder.group({
      title: ['', [Validators.required]]
    })
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

  onFileChange(event: any): void {
    this.selectedFiles = Array.from(event.target.files) as File[];

    if(this.selectedFiles.length > 1) {
      this.showMultipleFileMessage = true
    } else {
      this.showMultipleFileMessage = false
    }

    this.previewFiles = this.selectedFiles.map(file => ({
      preview: this.generatePreview(file)
    }));
  }

  isValidFileType(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm', 'video/ogg'];
    return validTypes.includes(file.type);
  }

  generatePreview(file: File): string {
    return URL.createObjectURL(file);
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  validate() {

    if(!this.selectedCatgeories || !this.selectedCatgeories.length) {
      this.errorObject.categorie.show = true
      return false
    } else {
      this.errorObject.categorie.show = false
    }

    if(!this.selectedFiles || !this.selectedFiles.length) {
      this.errorObject.files.show = true
      return false
    } else {
      this.errorObject.files.show = false;
    }

    return true
  }

  async submitForm(): Promise<void> {
    
    console.log(this.selectedFiles)

    if (this.createPostForm.valid) {
      if (this.createPostForm.controls.title.value) {

        if(this.validate()) {
          try {

            const formData = {
              title: this.createPostForm.controls.title.value,
              categories: this.selectedCatgeories,
              files: Array.from(this.selectedFiles) as File[]
            }
            
            console.log(formData)

            const response = await this.postsService.createPost(formData);
  
          } catch (e) {
            console.log('Create post error', e);
          }
        }

      } else {
        return;
      }
    } else {
      Object.values(this.createPostForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


}
