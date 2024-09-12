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
import { LocationsService } from 'src/services/api/locations.service';
import { PersonalService } from 'src/services/api/personal.service';
import { DesignerCategory, Location } from 'src/app/common/interfaces/CommonInterface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-convert-to-designer-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzIconModule, NzButtonModule, NzSelectModule, NzTypographyModule],
  templateUrl: './convert-to-designer-form.component.html',
  styleUrls: ['./convert-to-designer-form.component.css']
})

export class ConvertToDesignerFormComponent implements OnInit{

  designerCategories: DesignerCategory[] = [];
  locations: Location[] = [];
  selectedCatgeories = [];
  selectedLocation: string | null = null;
  loading = false;

  errorObject = {
    categoryError: {
      show: false
    },
    locationError: {
      show: false
    }
  }

  async ngOnInit() {
    await this.getAllCategories()
    await this.getAllLocations()
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  constructor(
    private designerCategoryService: DesignerCategoryService,
    private locationsService: LocationsService,
    private personalService: PersonalService,
    private message: NzMessageService,
    private apiAuthService: ApiAuthService,
    private router: Router
  ) {

  }

  async getAllCategories() {
    try {
      const response = await this.designerCategoryService.getAllDesignerCategories();
      if (response) {
        this.designerCategories = response.body;
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getAllLocations() {
    try{
      const response = await this.locationsService.getAllLocations();
      if(response) {
        this.locations = response.body
      }
    } catch (error) {
      console.log(error)
    }
  }

  validate() {

    if(!this.selectedLocation) {
      this.errorObject.locationError.show = true
      return false
    } else {
      this.errorObject.locationError.show = false;
    }
    
    if(!this.selectedCatgeories || !this.selectedCatgeories.length) {
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
        let categories_ : string[] = []
        this.selectedCatgeories.forEach(selectedCategory => {
          categories_.push(selectedCategory)
        });
        const response = await this.personalService.convertToDesignerProfile(this.selectedLocation as string, categories_)
        if(response) {
          this.createMessage(response.status, response.message as string)

          this.apiAuthService.updateUserRole('Designer')
          
          if(response.status === 'success') {
            setTimeout(() => {
              this.apiAuthService.logout()
              // this.router.navigate(['/designer-digest/designer/profile'])
            }, 2000)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

}
