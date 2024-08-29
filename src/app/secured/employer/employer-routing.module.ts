import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { VacanciesComponent } from "./vacancies/vacancies.component";
import { ChatsComponent } from "./chats/chats.component";
import { SingleChatComponent } from "./single-chat/single-chat.component";
import { EmployerLayoutComponent } from "./layout/layout.component";
import { CreateVacancyComponent } from "./create-vacancy/create-vacancy.component";
import { ApplicationsComponent } from "./applications/applications.component";
import { UpdateVacancyComponent } from "./update-vacancy/update-vacancy.component";
import { SingleVacancyComponent } from "./single-vacancy/single-vacancy.component";

const routes: Routes = [
    {
        path: "",
        component: EmployerLayoutComponent,
        children: [
            { path: "", redirectTo: "profile", pathMatch: "full" },
            { path: "profile", component: ProfileComponent },
            { path: "applications", component: ApplicationsComponent },
            { path: "create-vacancy", component: CreateVacancyComponent },
            { path: "update-vacancy/:id", component: UpdateVacancyComponent },
            { path: "vacancies", component: VacanciesComponent },
            { path: "vacancies/:id", component: SingleVacancyComponent },
            { path: "chats", component: ChatsComponent },
            { path: "chats/:id", component: SingleChatComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployerRoutingModule { }