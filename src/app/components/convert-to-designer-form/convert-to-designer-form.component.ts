import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DesignerCategoryService } from 'src/services/api/designer-category.service';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

interface DesignerCategory {
  id: string,
  name: string
}

@Component({
  selector: 'app-convert-to-designer-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzIconModule, NzButtonModule, NzSelectModule, NzTypographyModule],
  templateUrl: './convert-to-designer-form.component.html',
  styleUrls: ['./convert-to-designer-form.component.css']
})

export class ConvertToDesignerFormComponent implements OnInit{
  designerCategories: DesignerCategory[] = []
  selectedCatgeories = [];  
  loading = false;

  errorObject = {
    categoryError: {
      show: false
    }
  }

  async ngOnInit() {
    await this.getAll()
  }

  constructor(
    private designerCategoryService: DesignerCategoryService
  ) {

  }

  async getAll() {
    try {
      const response = await this.designerCategoryService.getAllDesignerCategories();
      if (response) {
        this.designerCategories = response.body;
      }
    } catch (error) {
      console.log(error)
    }
  }

  validate() {
    if(!this.selectedCatgeories.length) {
      this.errorObject.categoryError.show = true;
      return false
    } else {
      this.errorObject.categoryError.show = false;
    }
    return true
  }

  async submitForm() {
    try {
      if(this.validate()) {
        // const response = await 
      }
    } catch (error) {
      console.log(error)
    }
  }

}
