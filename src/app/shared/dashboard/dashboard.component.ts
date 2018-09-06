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
import { FilterDto } from "../../core/product/filter.dto";

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
  notSelected: boolean;
  bill: boolean;
  selectedIndex: number;
  productQuantity: number;
  productSelected: ProductModel;
  amount: number;
  quantitys: number[];
  modal = false;
  arrSaleDto: Array<SaleDto>;
  dataResult: Array<any>;
  breakpoint: number;
  filterDTO: FilterDto;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.reset();
    this.arrSaleDto = new Array<SaleDto>();
    this.handleStorage(true);
    this.validSizes();
  }

  onResize(event) {
    this.validSizes();
  }

  reset() {
    this.active = false;
    this.subLevels = new Array<CategoryModel>();
    this.productSelected = new ProductModel();
    this.quantitys = new Array<number>();
    this.dataResult = new Array<any>();
    this.categoryId = 0;
    this.subLevelId = 0;
    this.amount = 0;
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
  }

  /**
   * método que se encarga de procesar la elección del item
   * @param $event archivo de tipo ProductModel
   */
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
      this.appService.doCatch(error);
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
        const clearPrice = this.productSelected.price
          .replace("$", "")
          .replace(",", "");
        const numberPrice = parseInt(clearPrice, 0);
        this.amount = numberPrice * $event.value;
      }
    } catch (error) { }
  }

  /**
   * método que se encarga de agregar el producto al carrito
   */
  saveChanges(state = true) {
    try {
      if (state) {
        if (this.productQuantity > 0) {
          this.modal = false;
          const obj = {
            product: this.productSelected,
            quantity: this.productQuantity,
            category: this.categoryId
          };
          this.arrSaleDto.push(obj);
          this.handleStorage();
          this.clearSelected();
        } else {
          this.notSelected = true;
        }
      } else {
        this.modal = false;
      }

    } catch (error) {
      this.appService.doCatch(error);
    }
  }

  /**
   * método que resetea el item elegido
   */
  clearSelected() {
    this.productSelected = new ProductModel();
    this.productQuantity = 0;
  }

  /**
   * método que se encarga de guardar el array en el localStorage
   * @param init parametro que indica si el componente se carga por primera vez.
   */
  handleStorage(init = false) {
    try {
      /**
       * si se están guardando datos
       */
      if (init == false) {
        const jsonifyCart = JSON.stringify(this.arrSaleDto);
        localStorage.setItem("products", jsonifyCart);
      }
      /**
       * si se van a consultar los articulos ya guardados en el storage
       */
      else {
        if (localStorage.getItem("products")) {
          const previusData = localStorage.getItem("products");
          const jsonifyCart = JSON.parse(previusData);
          this.arrSaleDto = jsonifyCart;
          if (this.arrSaleDto.length > 0) {
            this.detail = true;
          }
          // localStorage.setItem("products", "");
        }
      }
    }
    catch (error) {
      this.appService.doCatch(error);
    }

  }

  /**
   * método que convierte los datos tipo cols hacia el producto
   * @param row elemento tipo cols
   */
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

  validSizes() {
    const w = window.innerWidth;
    let breaki = 1;
    if (w < 400) {
      breaki = 1;
    } else if (w > 400 && w < 750) {
      breaki = 2;
    } else if (w > 751 && w < 1024) {
      breaki = 3;
    } else if (w > 1025) {
      breaki = 4;
    }
    this.breakpoint = breaki;
  }

  applyFilters($event) {
    this.filterDTO = $event;
  }

  sendResultToFilter($event) {
    this.dataResult = $event;
  }
}
