import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthguardService } from "src/services/common/authguard.service";
import { DesignerRouteGuardService } from "src/services/common/designer-route-guard.service";

const routes: Routes = [
    {
        path: "designer",
        canActivate: [AuthguardService, DesignerRouteGuardService],
        loadChildren: () => import("./designer/designer.module").then(m => m.DesignerModule)
    },
    {
        path: "employer",
        canActivate: [AuthguardService],
        loadChildren: () => import("./employer/employer.module").then(m => m.EmployerModule)
    },
    {
        path: "personal",
        canActivate: [AuthguardService],
        loadChildren: () => import("./personal/personal.module").then(m => m.PersonalModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecuredRoutingModule { }