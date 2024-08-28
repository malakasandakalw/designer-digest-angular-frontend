import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { DesignerCategoryService } from 'src/services/api/designer-category.service';
import { DesignerService } from 'src/services/api/designer.service';
import { LocationsService } from 'src/services/api/locations.service';
import { DesignerCategory, DesignerLocations, Designer } from '../designers/designers.component';

@Component({
  selector: 'app-single-location-designers',
  templateUrl: './single-location-designers.component.html',
  styleUrls: ['./single-location-designers.component.css']
})
export class SingleLocationDesignersComponent  {

  loading = false
  followedOnly = false

  totalDesigners = 0;
  pageIndex = 1;
  pageSize = 50;

  categories: DesignerCategory[] = []
  loadingCategories: boolean = false
  selectedCategories: string[] = []

  selectedLocation:string | null = null

  orderByList = [
    {
      value: 'name',
      label: 'Name'
    },
    {
      value: 'follow_count',
      label: 'Followers Count'
    },
    {
      value: 'upvotes_count',
      label: 'Most Upvoted'
    },
  ]
  orderBy: string = 'name'

  searchText: string = ''

  designers: Designer[] = []

  get currentUser() {
    return this.apiAuthService.getCurrentUser().user
  }

  constructor(
    private designerCategoryService: DesignerCategoryService,
    private apiAuthService: ApiAuthService,
    private designerService: DesignerService,
    private route: ActivatedRoute
  ){
    this.route.paramMap.subscribe(params => {
      this.selectedLocation = params.get('id');
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getCategories()
    await this.getDesigners()
  }

  async getCategories() {
    try {
      this.loadingCategories = true
      const response = await this.designerCategoryService.getAllDesignerCategories();
      if (response) {
        this.categories = response.body;
      }
      this.loadingCategories = false
    } catch (e) {
      console.log('Get categories error', e);
      this.loadingCategories = false
    }
  }

  async getDesigners() {
    try {
      this.loading = true
      const filterData = {
        followed_only: this.followedOnly,
        categories: this.selectedCategories,
        order_by: this.orderBy,
        locations: [this.selectedLocation],
        search: this.searchText,
        page_index: this.pageIndex,
        page_size: this.pageSize,
        userId: this.currentUser && this.currentUser.id ? this.currentUser.id : null
      }
      const response = await this.designerService.getFilteredDesigners(filterData);
      if (response) {
        this.totalDesigners = response.body.result.total
        this.designers = response.body.result.designers;
      }
      this.loading = false
    } catch (error) {
      console.log(error)
    }
  }

  async onFilterCategoryChange() {
    await this.getDesigners()
  }

  async onFilterLocationChange() {
    await this.getDesigners()
  }

  async onOrderByChange() {
    await this.getDesigners()
  }

  async onSearchChange() {
    await this.getDesigners()
  }


}