import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DesignerCategory } from 'src/app/designers/designers.component';
import { ILocation } from 'src/app/secured/employer/create-vacancy/create-vacancy.component';
import { LocationsService } from 'src/services/api/locations.service';
import { DesignerCategoryService } from 'src/services/api/designer-category.service';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-vacancy-filter',
  standalone: true,
  imports: [CommonModule,  NzSelectModule, FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzIconModule ,NzButtonModule, NzCheckboxModule],
  templateUrl: './vacancy-filter.component.html',
  styleUrls: ['./vacancy-filter.component.css']
})
export class VacancyFilterComponent implements OnInit{
  @Output() emitSelectedCategories = new EventEmitter<string[]>();
  @Output() emitSelectedLocations = new EventEmitter<string[]>();
  @Output() emitActive = new EventEmitter<boolean>();
  @Output() emitOnSearch = new EventEmitter<string>();

  categories: DesignerCategory[] = [];
  selectedCatgeories = [];
  loadingCategories = false

  locations: ILocation[] = [];
  selectedLocations = []
  loadingLocations = false

  active = true

  searchText: string = ''

  constructor(
    private locationsService: LocationsService,
    private designerCategoriesService: DesignerCategoryService,
  ){}

    async ngOnInit(): Promise<void> {
      await this.getCategories()
      await this.getLocations()
    }

    async getCategories() {
      try {
        this.loadingCategories = true
        const response = await this.designerCategoriesService.getAllDesignerCategories()
        if(response && response.body) {
          this.categories = response.body
        }
        this.loadingCategories = false
      } catch (error) {
        console.log(error)
        this.loadingCategories = false
      }
    }
  
    async getLocations() {
      try {
        this.loadingLocations = true
        const response =  await this.locationsService.getAllLocations()
        if(response && response.body) {
          this.locations = response.body
        }
        this.loadingLocations = false
      } catch (error) {
        console.log(error)
        this.loadingLocations = false
      }
    }

    onCatSelect() {
      this.emitSelectedCategories.emit(this.selectedCatgeories)
    }

    onLocationSelect() {
      this.emitSelectedLocations.emit(this.selectedLocations)
    }

    onSearchChange() {
      this.emitOnSearch.emit(this.searchText)
    }

    onActiveChange() {
      this.emitActive.emit(this.active)
    }

}
