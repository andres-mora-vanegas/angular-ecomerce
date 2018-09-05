import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "../shared/dashboard/dashboard.component";
import { ProductComponent } from "../core/product/product/product.component";
import { ProductListComponent } from "../core/product/product-list/product-list.component";
import { HomeComponent } from "../shared/home/home.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "inicio", pathMatch: "full" },
  { path: "admin/", component: DashboardComponent },
  { path: "product/:id", component: ProductComponent },
  { path: "product-list", component: ProductListComponent },  
  { path: "cart", component: ProductListComponent },  
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule {}
