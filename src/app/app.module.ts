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
import { PostsCardsHorizontalComponent } from "./components/posts-cards-horizontal/posts-cards-horizontal.component";
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
    SinglePostComponentPublic
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
    PostsCardsHorizontalComponent,
    SinglePostCardComponent,
    FileUploadComponent,
    MainNavbarComponent,
    MainPostsFilterComponent,
    NzTagModule,
    NzToolTipModule,
    NzIconModule,
    LoadingSpinnerComponent,
    NzAvatarModule
],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
