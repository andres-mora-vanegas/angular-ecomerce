import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MynavComponent } from './shared/mynav/mynav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ProductListComponent } from './core/product/product-list/product-list.component';
import { ProductComponent } from './core/product/product/product.component';
import { HomeComponent } from './shared/home/home.component';
import { RoutingModule } from './routing/routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { AppService } from './app.service';
import { AvaibilityPipe } from './pipes/avaibility.pipe';
import { ProductCategoryComponent } from './core/product/product-category/product-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModalComponent } from './shared/router-modal/router-modal.component';
import { RouterModalService } from './shared/router-modal/router-modal.service';

import { ToNumberPipe } from './pipes/to-number.pipe';
import { ProductFiltersComponent } from './core/product/product-filters/product-filters.component';
import { ClearCaractersPipe } from './pipes/clear-caracters.pipe';


import { ProductListService } from './core/product/product-list/product-list.service';
import { VehicleListComponent } from './core/vehicle/vehicle-list/vehicle-list.component';
import { SearchComponent } from './core/search/search/search.component';
import { ClientComponent } from './core/client/client/client.component';
import { ClientListComponent } from './core/client/client-list/client-list.component';
import { CsvComponent } from './shared/csv/csv/csv.component';
import { VehicleUserAddComponent } from './core/vehicle/vehicle-user-add/vehicle-user-add.component';

@NgModule({
  declarations: [
    AppComponent,
    MynavComponent,
    ProductListComponent,
    ProductComponent,
    HomeComponent,
    AvaibilityPipe,
    ProductCategoryComponent,
    RouterModalComponent,

    ToNumberPipe,
    ProductFiltersComponent,
    ClearCaractersPipe,

    VehicleListComponent,
    SearchComponent,
    ClientComponent,
    ClientListComponent,
    CsvComponent,
    VehicleUserAddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    RoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AppService,
    RouterModalService,
    ProductListService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
