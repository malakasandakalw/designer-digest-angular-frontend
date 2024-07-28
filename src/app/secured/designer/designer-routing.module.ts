import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DesignerLayoutComponent } from "./layout/layout.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
    {
        path: "",
        component: DesignerLayoutComponent,
        children: [
            { path: "", redirectTo: "profile", pathMatch: "full" },
            { path: "profile", component: ProfileComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DesignerRoutingModule { }