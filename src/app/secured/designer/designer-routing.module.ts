import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DesignerLayoutComponent } from "./layout/layout.component";
import { ProfileComponent } from "./profile/profile.component";
import { CreatePostComponent } from "./create-post/create-post.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MyStoreComponent } from "./my-store/my-store.component";
import { VacanciesComponent } from "./vacancies/vacancies.component";

const routes: Routes = [
    {
        path: "",
        component: DesignerLayoutComponent,
        children: [
            { path: "", redirectTo: "profile", pathMatch: "full" },
            { path: "profile", component: ProfileComponent },
            { path: "create-post", component: CreatePostComponent },
            { path: "dashboard", component: DashboardComponent },
            { path: "my-store", component: MyStoreComponent },
            { path: "vacancies", component: VacanciesComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DesignerRoutingModule { }