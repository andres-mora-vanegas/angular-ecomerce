import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import {
  Breakpoints,
  BreakpointState,
  BreakpointObserver
} from "@angular/cdk/layout";
import { CategoryModel } from "../../core/product/category.model";
import { AppService } from "./../../app.service";
import { ProductModel } from "../../core/product/product.model";
import { SaleDto } from "../../core/sale/sale.dto";

@Component({
  selector: "app-shared/dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  subLevels: Array<CategoryModel>;
  subLevelId: number;
  categoryId: number;
  active: boolean;
  detail: boolean;
  bill: boolean;
  selectedIndex: number;
  productQuantity: number;
  productSelected: ProductModel;
  amount: number;
  quantitys: number[];
  modal = false;
  arrSaleDto: Array<SaleDto>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.reset();
  }

  reset() {
    this.active = false;
    this.subLevels = new Array<CategoryModel>();
    this.productSelected = new ProductModel();
    this.quantitys = new Array<number>();
    this.categoryId = 0;
    this.subLevelId = 0;
    this.amount = 0;
    this.arrSaleDto = new Array<SaleDto>();
  }

  findSubLevel($event) {
    try {
      if ($event.subLevels && $event.categoryId) {
        this.subLevels = $event.subLevels;
        this.categoryId = $event.categoryId;
        this.active = true;
      } else {
        this.reset();
      }
      console.log($event);
    } catch (error) {
      this.appService.doCatch(error);
    }
  }

  findSubLevelSecond($event) {
    /* if ($event.subLevels && $event.categoryId) {
      this.subLevels = $event.subLevels;
      this.categoryId = $event.categoryId;
      this.active = true;
    } else {
      this.reset();
    } */
    this.subLevelId = $event.subLevelId;
    console.log($event);
  }

  nextCartProcess($event) {
    try {
      if ($event.product != null) {
        this.detail = true;
        this.modal = true;
        this.revertDataTableToRecord($event.product);
        this.generateQuantitys();
        // this.selectedIndexChange(1);
      } else {
        this.detail = false;
        this.modal = false;
        this.productSelected = new ProductModel();
        // this.selectedIndexChange(0);
      }
    } catch (error) {

    }
  }

  /**
   * método que se encarga de cambiar la pestaña
   * @param number id de la pestaña 
   */
  selectedIndexChange(number) {
    this.selectedIndex = number;
  }

  multiply($event) {
    try {
      if ($event.value) {
        const clearPrice = this.productSelected.price.replace("$", "").replace(",", "");
        const numberPrice = parseInt(clearPrice, 0);
        this.amount = numberPrice * $event.value;
      }
    } catch (error) {

    }
  }

  saveChanges() {
    try {
      this.modal = false;
      const obj = {
        product: this.productSelected,
        quantity: this.productQuantity,
        category: this.categoryId
      }
      this.arrSaleDto.push(obj);
      this.clearSelected();
    } catch (error) {
      this.appService.doCatch(error);
    }
  }

  clearSelected() {
    this.productSelected = new ProductModel();
    this.productQuantity = 0;
  }

  revertDataTableToRecord(row) {
    try {
      this.productSelected.id = row.col1;
      this.productSelected.name = row.col2;
      this.productSelected.quantity = row.col3;
      this.productSelected.price = row.col4;
      this.productSelected.sublevel_id = row.col5;
      this.productSelected.available = row.col6;
    } catch (error) {
      this.appService.doCatch(error);
    }
  }

  generateQuantitys() {
    try {
      const q = parseInt(this.productSelected.quantity, 0);
      for (let i = 1; i <= q; i++) {
        this.quantitys.push(i);
      }
    } catch (error) {
      this.appService.doCatch(error);
    }

  }
}
