import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { SearchComponent } from './pages/search/search.component';
import { ActorComponent } from './pages/actor/actor.component';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "detail", redirectTo: "home", pathMatch: "full" },
    { path: "detail/:id", component: DetailsComponent },
    { path: "search", redirectTo: "home", pathMatch: "full" },
    { path: "search/:query", component: SearchComponent },
    { path: "person", redirectTo: "home", pathMatch: "full" },
    { path: "person/:idPerson", component: ActorComponent },
    { path: "**", redirectTo: "home" }
];

