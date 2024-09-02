import { Component, OnInit } from '@angular/core';
import { PostCategory } from '../common/interfaces/CommonInterface';
import { CategoryService } from 'src/services/api/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: PostCategory[] = []
  loading = false

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ){}

  async ngOnInit() {
    await this.getCategories()
  }

  async getCategories() {
    try {
      this.loading = true
      const response = await this.categoryService.getAllCategories();
      if (response) {
        this.categories = response.body;
      }
      this.loading = false
    } catch (e) {
      console.log('Get categories error', e);
      this.loading = false
    }
  }

  navigateToCategory(id: string) {
    if(!id) return
    this.router.navigate([`/categories/${id}`])
  }

}
