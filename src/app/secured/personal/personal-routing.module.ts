import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PersonalLayoutComponent } from "./layout/layout.component";
import { ProfileComponent } from "./profile/profile.component";
import { ConvertToDesignerFormComponent } from "src/app/components/convert-to-designer-form/convert-to-designer-form.component";
import { ConvertToEmployerComponent } from "src/app/components/convert-to-employer-component/convert-to-employer-component.component";

const routes: Routes = [
    {
        path: "",
        component: PersonalLayoutComponent,
        children: [
            { path: "", redirectTo: "profile", pathMatch: "full" },
            { path: "profile", component: ProfileComponent },
            { path: "convert-to-designer", component: ConvertToDesignerFormComponent },
            { path: "convert-to-employer", component: ConvertToEmployerComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonalRoutingModule { }