import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AppService } from '../../../app.service';
import { ProductModel } from '../product.model';
import { FilterDto } from '../filter.dto';
import { ClearCaractersPipe } from '../../../pipes/clear-caracters.pipe';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges {
  displayedColumns = ['col2', 'col3', 'col4', 'col5', 'col6'];
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

  constructor(
    private appService: AppService,
    private productListService: ProductListService
  ) {
    this.productListService.componentMethodCalled$.subscribe(action => {
      this.getProducts(r => this.applyUserFiltersService(action, r));
    });
  }

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
   * método que se encarga de convertir el array de respuesta del servicio en datos para la tabla
   * @param data datos que se obtuvieron en la consulta
   * @param cb callback que se encarga de aplicar filtros adicionales
   */
  converDataToDataTable(data: any, cb = null) {
    try {
      const localData = [];
      if (data.products.length > 0) {
        this.arrayData = [];
        data.products.forEach((element: ProductModel) => {
          let element_ = element;
          if (this.subLevelId != null && this.categoryId != null) {
            if (this.subLevelId !== element_.sublevel_id) {
              element_ = new ProductModel();
            }
            if (cb != null && element_.id != null) {
              element_ = cb(element_);
            }
          }
          if (element_.id != null) {
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
          }
        });
        this.dataSource = new MatTableDataSource(this.arrayData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 200);
        this.dataResult.emit(localData);
      } else {
        console.log('No hay datos');
      }
    } catch (error) {
      this.appService.doCatch(error);
    }
  }

  /**
   * método que se encarga de consultar los datos del archivo
   * @param cb callback que ejecutará filtros adicionales sobre los registros obtenidos
   */
  getProducts(cb = null) {
    this.appService
      .doGet('./assets/data/products.json')
      .then((r: any) => {
        this.converDataToDataTable(r, cb);
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
    } catch (error) { }
  }

  /**
   * método que se encarga de retornar el producto que cumpla con los filtros indicados
   * @param changes cambios que vienen desde el dashboard y el componente filter
   * @param response item a evaluar para que cumpla con los filtros
   */
  applyUserFilters(changes: SimpleChanges, response: ProductModel) {
    let res = new ProductModel();
    try {
      if (changes.filterDTO != null && changes.filterDTO.currentValue != null) {
        const clearPrice = parseInt(
          new ClearCaractersPipe().transform(response.price),
          0
        );
        const curr = changes.filterDTO.currentValue;
        if (curr.availity != null && response.available !== curr.availity) {
          return res;
        }
        if (curr.minValue != null && clearPrice <= curr.minValue) {
          return res;
        }
        if (curr.maxValue != null && clearPrice >= curr.maxValue) {
          return res;
        }
        // 553, 698, 546 --- 700
        if (curr.minQuantity != null && response.quantity <= curr.minQuantity) {
          return res;
        }
        if (curr.maxQuantity != null && response.quantity >= curr.maxQuantity) {
          return res;
        }

        res = response;
      }
    } catch (error) {
      this.appService.doCatch(error);
    }
    return res;
  }

  applyUserFiltersService(filterDTO: FilterDto, response: ProductModel) {
    let res = new ProductModel();
    try {
      if (filterDTO != null) {
        const clearPrice = parseInt(
          new ClearCaractersPipe().transform(response.price),
          0
        );
        const curr = filterDTO;
        if (curr.availity != null && response.available !== curr.availity) {
          return res;
        }
        if (curr.minValue != null && clearPrice <= curr.minValue) {
          return res;
        }
        if (curr.maxValue != null && clearPrice >= curr.maxValue) {
          return res;
        }
        // 553, 698, 546 --- 700
        if (
          curr.minQuantity != null &&
          parseInt(response.quantity, 0) <= curr.minQuantity
        ) {
          return res;
        }
        if (
          curr.maxQuantity != null &&
          parseInt(response.quantity, 0) >= curr.maxQuantity
        ) {
          return res;
        }

        res = response;
      }
    } catch (error) {
      this.appService.doCatch(error);
    }
    return res;
  }

  ngOnChanges(changes: SimpleChanges) {
    try {
      console.log(changes);
    } catch (error) {
      this.appService.doCatch(error);
    }
  }

  edit() {
    try {

    } catch (error) {
      this.appService.doCatch(error);
    }

  }
}
