import { Component } from '@angular/core';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { DesignerCategoryService } from 'src/services/api/designer-category.service';
import { DesignerService } from 'src/services/api/designer.service';
import { LocationsService } from 'src/services/api/locations.service';
import { User } from '../common/interfaces/CommonInterface';
import { Router } from '@angular/router';

export interface DesignerCategory {
  id: string,
  name: string
}

export interface DesignerLocations {
  id: string,
  name: string
}

export interface Designer {
  user_id: string,
  designer_id: string,
  first_name: string,
  last_name: string,
  email: string,
  phone?: string,
  profile_picture?: string | null,
  locations: {id: string, name: string}[],
  categories: {id: string, name: string}[],
  posts_count: number,
  follow_count: number,
  upvotes_count: number,
  user_has_followed?: boolean
}
@Component({
  selector: 'app-designers',
  templateUrl: './designers.component.html',
  styleUrls: ['./designers.component.css']
})
export class DesignersComponent {

  loading = false
  followedOnly = false

  totalDesigners = 0;
  pageIndex = 1;
  pageSize = 50;

  categories: DesignerCategory[] = []
  loadingCategories: boolean = false
  selectedCategories: string[] = []

  locations: DesignerLocations[] = []
  loadingLocations: boolean = false
  selectedLocations: string[] = []

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
    private locationService: LocationsService,
    private designerCategoryService: DesignerCategoryService,
    private apiAuthService: ApiAuthService,
    private designerService: DesignerService,
    private router: Router
  ){}

  async ngOnInit(): Promise<void> {
    await this.getCategories()
    await this.getLocations()
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

  async getLocations() {
    try {
      this.loadingLocations = true
      const response = await this.locationService.getAllLocations();
      if (response) {
        this.locations = response.body;
      }
      this.loadingLocations = false
    } catch (e) {
      console.log('Get categories error', e);
      this.loadingLocations = false
    }
  }

  async getDesigners() {
    try {
      this.loading = true
      const filterData = {
        followed_only: this.followedOnly,
        categories: this.selectedCategories,
        order_by: this.orderBy,
        locations: this.selectedLocations,
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
      this.loading = false
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

  async onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex
    await this.getDesigners()
  }

}
