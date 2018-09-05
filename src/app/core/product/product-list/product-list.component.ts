import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { AppService } from "../../../app.service";
import { ProductModel } from "../product.model";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  displayedColumns = ["col2", "col3", "col4", "col5", "col6"];
  dataSource: MatTableDataSource<any>;

  @Input()
  subLevelId: number;
  @Input()
  categoryId: number;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private appService: AppService) {}

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
      if (data.products.length > 0) {
        const arrayData = [];
        data.products.forEach((element: ProductModel) => {
          let element_ = element;
          if (this.subLevelId != null && this.categoryId != null) {
            if (this.subLevelId != element_.sublevel_id) {
              element_ = new ProductModel();
            }
          }
          const arrayItem = {
            col1: element_.id,
            col2: element_.name,
            col3: element_.quantity,
            col4: element_.price,
            col5: element_.sublevel_id,
            col6: element_.available
          };
          if (arrayItem.col1 != null && arrayItem.col5 != null) {
            arrayData.push(arrayItem);
          }
        });
        this.dataSource = new MatTableDataSource(arrayData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 200);
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
}
