import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CategoriesComponent } from './categories/categories.component';
import { DesignersComponent } from './designers/designers.component';
import { AllPostsComponent } from './all-posts/all-posts.component';

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
        path: 'designers',
        component: DesignersComponent
      },
      {
        path: 'all-posts',
        component: AllPostsComponent
      }
      ,
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
