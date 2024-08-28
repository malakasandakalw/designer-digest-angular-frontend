import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CategoriesComponent } from './categories/categories.component';
import { DesignersComponent } from './designers/designers.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { SinglePostComponentPublic } from './single-post/single-post.component';
import { SingleDesignerComponent } from './single-designer/single-designer.component';
import { SingleCategoryComponent } from './single-category/single-category.component';
import { SingleLocationDesignersComponent } from './single-location-designers/single-location-designers.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'categories/:id',
        component: SingleCategoryComponent
      },
      {
        path: 'designers',
        component: DesignersComponent
      },
      {
        path: 'designers/location/:id',
        component: SingleLocationDesignersComponent
      },
      {
        path: 'designers/:id',
        component: SingleDesignerComponent
      },
      {
        path: 'all-posts',
        component: AllPostsComponent
      },      
      {
        path: 'all-posts/:id',
        component: SinglePostComponentPublic
      },
      {
        path: "auth",
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
      },
      {
        path: "designer-digest",
        loadChildren: () => import("./secured/secured.module").then(m => m.SecuredModule)
      },
    ]
  },
  {
    path: "**", component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }