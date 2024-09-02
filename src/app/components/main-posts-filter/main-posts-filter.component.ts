import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { postCategory } from 'src/app/secured/designer/my-store/my-store.component';
import { CategoryService } from 'src/services/api/category.service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-main-posts-filter',
  standalone: true,
  imports: [CommonModule, NzSelectModule, FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzIconModule ,NzButtonModule],
  templateUrl: './main-posts-filter.component.html',
  styleUrls: ['./main-posts-filter.component.css']
})
export class MainPostsFilterComponent implements OnInit{

  @Input({required: true}) isCategoriesFilterShow = true
  @Output() emitSelectedCategories = new EventEmitter<string[]>();
  @Output() emitOrderBy = new EventEmitter<string>();
  @Output() emitOnSearch = new EventEmitter<string>();

  categories: postCategory[] = []
  loadingCategories = false
  selectedCategories: string[] = [] 

  orderByList = [
    {
      value: 'recent',
      label: 'Recent'
    },
    {
      value: 'most_voted',
      label: 'Most Voted'
    },
    {
      value: 'oldest',
      label: 'Oldest'
    },
  ]
  orderBy: string = 'recent'

  searchText: string = ''

  constructor(
    private readonly categoriesApi: CategoryService,
  ) {

  }

  async ngOnInit(): Promise<void> {
    await this.getCategories()
  }

  async getCategories() {
    try {
      this.loadingCategories = true
      const response = await this.categoriesApi.getAllCategories();
      if (response) {
        this.categories = response.body;
      }
      this.loadingCategories = false
    } catch (e) {
      console.log('Get categories error', e);
      this.loadingCategories = false
    }
  }

  onCatSelect() {
    this.emitSelectedCategories.emit(this.selectedCategories)
  }

  onOrderSelect() {
    this.emitOrderBy.emit(this.orderBy)
  }

  onSearchChange() {
    this.emitOnSearch.emit(this.searchText)
  }
  
  search() {
  }

}
