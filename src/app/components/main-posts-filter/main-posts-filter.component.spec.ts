import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPostsFilterComponent } from './main-posts-filter.component';
import { CategoryService } from 'src/services/api/category.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IServerResponse } from 'src/services/api/base.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

describe('MainPostsFilterComponent', () => {
  let component: MainPostsFilterComponent;
  let fixture: ComponentFixture<MainPostsFilterComponent>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CategoryService', ['getAllCategories']);
    spy.getAllCategories.and.returnValue(of({ body: [{ id: '1', name: 'Category 1' }] }));

    await TestBed.configureTestingModule({
      imports: [
        MainPostsFilterComponent,
        NzSelectModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzIconModule,
        BrowserAnimationsModule,
        CommonModule
      ],
      providers: [{ provide: CategoryService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPostsFilterComponent);
    component = fixture.componentInstance;
    categoryServiceSpy = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCategories on initialization', async () => {
    const mockResponse: IServerResponse<any> = {
      done: true,
      status: 'success',
      body: [{ id: '1', name: 'Category 1' }],
    };
    categoryServiceSpy.getAllCategories.and.returnValue(Promise.resolve(mockResponse));

    await component.ngOnInit();

    expect(categoryServiceSpy.getAllCategories).toHaveBeenCalled();
    expect(component.categories).toEqual(mockResponse.body);
  });

  it('should emit selected categories when onCatSelect is called', () => {
    spyOn(component.emitSelectedCategories, 'emit');
    component.selectedCategories = ['1', '2'];
    
    component.onCatSelect();

    expect(component.emitSelectedCategories.emit).toHaveBeenCalledWith(['1', '2']);
  });

  it('should emit order by value when onOrderSelect is called', () => {
    spyOn(component.emitOrderBy, 'emit');
    component.orderBy = 'most_voted';

    component.onOrderSelect();

    expect(component.emitOrderBy.emit).toHaveBeenCalledWith('most_voted');
  });

  it('should emit search text when onSearchChange is called', () => {
    spyOn(component.emitOnSearch, 'emit');
    component.searchText = 'search term';

    component.onSearchChange();

    expect(component.emitOnSearch.emit).toHaveBeenCalledWith('search term');
  });

  it('should render order options correctly', () => {
    fixture.detectChanges(); // Trigger change detection
    const orderSelect = fixture.debugElement.query(By.css('nz-select[nzPlaceHolder="Please select"]'));
    expect(orderSelect).toBeTruthy(); // Ensure the select element is present

    const options = orderSelect.queryAll(By.css('nz-option'));
    expect(options.length).toBe(component.orderByList.length); // Check if the number of options matches
    expect(options[0].nativeElement.textContent.trim()).toContain('Recent');
  });

  it('should render category options when categories are available', () => {
    component.categories = [
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Category 2' }
    ];
    fixture.detectChanges(); // Re-render component with new categories

    const categorySelect = fixture.debugElement.query(By.css('nz-select[nzPlaceHolder="Please select"]'));
    expect(categorySelect).toBeTruthy();

    const options = categorySelect.queryAll(By.css('nz-option'));
    expect(options.length).toBe(component.categories.length);
    expect(options[0].nativeElement.textContent.trim()).toContain('Category 1');
    expect(options[1].nativeElement.textContent.trim()).toContain('Category 2');
  });

  it('should show placeholder in search input', () => {
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('input[nz-input]'));
    expect(inputElement).toBeTruthy();
    expect(inputElement.nativeElement.getAttribute('placeholder')).toBe('Enter title');
  });
});
