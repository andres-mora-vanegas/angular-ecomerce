import { Component, OnInit, ViewChild, Input, Output, EventEmitter, SimpleChanges, OnChanges } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { AppService } from "../../../app.service";
import { ProductModel } from "../product.model";
import { FilterDto } from "../filter.dto";


@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnChanges {
  displayedColumns = ["col2", "col3", "col4", "col5", "col6"];
  dataSource: MatTableDataSource<any>;

  @Input()
  subLevelId: number;
  @Input()
  categoryId: number;

  @Input()
  filterDTO: FilterDto;
  @Output()
  productDTO = new EventEmitter<any>();

  @Output()
  dataResult = new EventEmitter<any>();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  arrayData: Array<any>;

  constructor(private appService: AppService) { }

  ngOnInit() {
    // Assign the data to the data source for the table to render
    this.getProducts();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /**
   * método que se encarga de convertir el array de respuesta del servicio
   * en datos para la tabla
   */
  converDataToDataTable(data: any) {
    try {
      const localData = [];
      if (data.products.length > 0) {
        this.arrayData = [];
        data.products.forEach((element: ProductModel) => {
          let element_ = element;
          if (this.subLevelId != null && this.categoryId != null) {
            if (this.subLevelId != element_.sublevel_id) {
              element_ = new ProductModel();
            }
          }
          localData.push(element_);
          const arrayItem = {
            col1: element_.id,
            col2: element_.name,
            col3: element_.quantity,
            col4: element_.price,
            col5: element_.sublevel_id,
            col6: element_.available
          };
          if (arrayItem.col1 != null && arrayItem.col5 != null) {
            this.arrayData.push(arrayItem);
          }
        });
        this.dataSource = new MatTableDataSource(this.arrayData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 200);
        this.dataResult.emit(localData);
      } else {
        console.log("No hay datos");
      }
    } catch (error) {
      this.appService.doCatch(error);
    }
  }

  /**
   * método que se encarga de consultar los datos del archivo
   */
  getProducts() {
    this.appService
      .doGet("./assets/data/products.json")
      .then((r: any) => {
        this.converDataToDataTable(r);
      })
      .catch(this.appService.doCatch);
  }

  /**
   * método que se encarga de manejar las peticiones cuando se escoge un producto
   */
  chooseProduct(element) {
    try {
      /**
       * si se está realizando la elección del producto (compra)
       */
      if (this.subLevelId != null && this.categoryId != null) {
        const productDTO = {
          categoryId: this.categoryId,
          subLevelId: this.subLevelId,
          product: element
        };
        this.productDTO.emit(productDTO);
      }
    } catch (error) {

    }
  }

  edit(item: ProductModel) {
    try {

    } catch (error) {
      this.appService.doCatch(error);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    try {
      console.log(changes);
      this.arrayData = [];
      if (
        changes.filterDTO != null &&
        changes.filterDTO.currentValue != null &&
        changes.filterDTO.currentValue.availity != null
      ) {
        /* this.arrayData.forEach(element => {
          if (element.col6 != changes.availity) {
            element = {};
          }
        }); */

        this.dataSource.filterPredicate = (data:
          { col6: string }, filterValue: string) =>
          data.col6.trim().toLowerCase().indexOf(filterValue) !== -1;
      }
      if (changes.minQuantity) {

      }
      if (changes.maxQuantity) {

      }
      if (changes.minValue) {

      }
      if (changes.maxValue) {

      }
      /* if (changes.accountName.currentValue.length > 0) {
        this.accountNameSend = changes.accountName.currentValue;
        this.reset();
        this.active = true;
        this.getSubAccounts();
      } */
    } catch (error) {
      this.appService.doCatch(error);
    }
  }
}
