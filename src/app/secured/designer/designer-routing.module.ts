import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DesignerLayoutComponent } from "./layout/layout.component";
import { ProfileComponent } from "./profile/profile.component";
import { CreatePostComponent } from "./create-post/create-post.component";

const routes: Routes = [
    {
        path: "",
        component: DesignerLayoutComponent,
        children: [
            { path: "", redirectTo: "profile", pathMatch: "full" },
            { path: "profile", component: ProfileComponent },
            { path: "create-post", component: CreatePostComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DesignerRoutingModule { }