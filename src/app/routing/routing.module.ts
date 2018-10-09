import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "../shared/home/home.component";
import { VehicleListComponent } from "../core/vehicle/vehicle-list/vehicle-list.component";
import { SearchComponent } from "../core/search/search/search.component";
import { ClientComponent } from "../core/client/client/client.component";
import { ClientListComponent } from "../core/client/client-list/client-list.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "inicio", pathMatch: "full" },
  { path: "find/", component: SearchComponent },
  { path: "client/:id", component: ClientComponent },
  { path: "client-list", component: ClientListComponent },
  { path: "vehicle-brand", component: VehicleListComponent },
  { path: "vehicle", component: VehicleListComponent },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
