import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            { path: "", redirectTo: "login", pathMatch: "full" },
            { path: "login", component: LoginComponent },
            { path: "signup", component: SignupComponent }
        ]
    },
    {
        path: "",
        children: [
            { path: "**", redirectTo: "login", pathMatch: "full" }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
