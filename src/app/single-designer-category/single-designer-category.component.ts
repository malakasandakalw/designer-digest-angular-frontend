import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { CategoryService } from 'src/services/api/category.service';
import { LocationsService } from 'src/services/api/locations.service';
import { PostsService } from 'src/services/api/posts.service';
import { Designer, DesignerCategory, DesignerLocations } from '../designers/designers.component';
import { DesignerService } from 'src/services/api/designer.service';

@Component({
  selector: 'app-single-designer-category',
  templateUrl: './single-designer-category.component.html',
  styleUrls: ['./single-designer-category.component.css']
})
export class SingleDesignerCategoryComponent implements OnInit {
  
  id: string | null = null

  loading = false
  followedOnly = false

  totalDesigners = 0;
  pageIndex = 1;
  pageSize = 50;

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
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router,
    private apiAuthService: ApiAuthService,
    private categoryService: CategoryService,
    private locationService: LocationsService,
    private designerService: DesignerService
  ){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }
  
  async ngOnInit(): Promise<void> {
    await this.getLocations()
    await this.getDesigners()
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
        categories: [this.id],
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
