import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/services/api/category.service';

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

  createPostForm: FormGroup<{
    title: FormControl<string | null>;
  }>;

  categories: category[] = [];
  selectedCatgeories = [];
  selectedFiles: File[] = [];

  loading = false;

  async ngOnInit() {
    await this.getCategories();
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoriesApi: CategoryService
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

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  async submitForm(): Promise<void> {
    if (this.createPostForm.valid) {
      if (this.createPostForm.controls.title.value) {
        try {

          const data = {
            title: this.createPostForm.controls.title.value,
            categories: this.selectedCatgeories,
            files: this.selectedFiles
          }

          console.log(data);

        } catch (e) {
          console.log('Create post error', e);
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
