import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { IconModule } from '@ant-design/icons-angular';
import { RequestInterceptorService } from 'src/services/common/request-interceptor.service';
import { LayoutComponent } from './layout/layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HomePageComponent } from './home-page/home-page.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { SinglePostCardComponent } from './components/single-post-card/single-post-card.component';
import { ResponseInterceptorService } from 'src/services/common/response-interceptor.service';
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { MainNavbarComponent } from "./components/main-navbar/main-navbar.component";
import { RemovePrefixPipe } from './remove-prefix.pipe';
import { CategoriesComponent } from './categories/categories.component';
import { DesignersComponent } from './designers/designers.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { MainPostsFilterComponent } from "./components/main-posts-filter/main-posts-filter.component";
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SinglePostComponentPublic } from './single-post/single-post.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { SingleDesignerComponent } from './single-designer/single-designer.component';
import { SingleCategoryComponent } from './single-category/single-category.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { SingleDesignerCardComponent } from "./components/single-designer-card/single-designer-card.component";
import { SingleLocationDesignersComponent } from './single-location-designers/single-location-designers.component';
import { SingleDesignerCategoryComponent } from './single-designer-category/single-designer-category.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { SingleVacancyCardComponent } from "./components/single-vacancy-card/single-vacancy-card.component";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCollapseModule } from 'ng-zorro-antd/collapse'
import { FileUploadApplicationComponent } from "./components/file-upload-application/file-upload-application.component";
import { NzImageModule } from 'ng-zorro-antd/image';
import { FooterComponent } from "./components/footer/footer.component";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomePageComponent,
    RemovePrefixPipe,
    CategoriesComponent,
    DesignersComponent,
    AllPostsComponent,
    SinglePostComponentPublic,
    SingleDesignerComponent,
    SingleCategoryComponent,
    SingleLocationDesignersComponent,
    SingleDesignerCategoryComponent,
    VacanciesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    IconModule,
    NzLayoutModule,
    NzCardModule,
    SinglePostCardComponent,
    FileUploadComponent,
    MainNavbarComponent,
    MainPostsFilterComponent,
    NzTagModule,
    NzToolTipModule,
    NzIconModule,
    LoadingSpinnerComponent,
    NzAvatarModule,
    NzPaginationModule,
    NzSelectModule,
    NzCheckboxModule,
    SingleDesignerCardComponent,
    SingleVacancyCardComponent,
    NzModalModule,
    NzCollapseModule,
    FileUploadApplicationComponent,
    NzImageModule,
    NzTagModule,
    FooterComponent
],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
