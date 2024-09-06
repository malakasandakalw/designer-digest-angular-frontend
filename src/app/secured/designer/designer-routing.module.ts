import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DesignerLayoutComponent } from "./layout/layout.component";
import { ProfileComponent } from "./profile/profile.component";
import { CreatePostComponent } from "./create-post/create-post.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MyStoreComponent } from "./my-store/my-store.component";
import { VacanciesComponent } from "./vacancies/vacancies.component";
import { SinglePostComponent } from "./single-post/single-post.component";
import { ChatsComponent } from "./chats/chats.component";
import { SingleChatComponent } from "./single-chat/single-chat.component";
import { UpdatePostComponent } from "./update-post/update-post.component";
import { SingleVacancyComponent } from "./single-vacancy/single-vacancy.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

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
            { path: "my-store/:id", component: SinglePostComponent },
            { path: "applications", component: VacanciesComponent },
            { path: "applications/:id", component: SingleVacancyComponent },
            { path: "update-post/:id", component: UpdatePostComponent },
            { path: "chats", component: ChatsComponent },
            { path: "chats/:id", component: SingleChatComponent },
            { path: "reset-password", component: ResetPasswordComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DesignerRoutingModule { }