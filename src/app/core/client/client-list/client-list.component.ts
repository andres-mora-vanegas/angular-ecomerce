import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AppService } from '../../../app.service';
import { ClientModel } from '../client.model';
import { FilterDto } from '../../product/filter.dto';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

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

  ) {

  }

  ngOnInit() {
    // Assign the data to the data source for the table to render
    this.getVehicles();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /**
   * método que se encarga de consultar los datos del backend
   * @param cb callback que ejecutará filtros adicionales sobre los registros obtenidos
   */
  getVehicles(cb = null) {
    this.appService
      .doGet('client')
      .then((r: any) => {
        this.converDataToDataTable(r, cb);
      })
      .catch(this.appService.doCatch);
  }

  /**
   * método que se encarga de convertir el array de respuesta del servicio en datos para la tabla
   * @param data datos que se obtuvieron en la consulta
   * @param cb callback que se encarga de aplicar filtros adicionales
   */
  converDataToDataTable(data: any, cb = null) {
    try {
      const localData = [];
      if (data.length > 0) {
        this.arrayData = [];
        data.forEach((element: ClientModel) => {
          const element_ = element;
          if (element_.id != null) {
            localData.push(element_);
            const arrayItem = {
              col1: element_.id,
              col2: element_.first_name + ' ' + element_.last_name,
              col3: element_.email,
              col4: element_.scanned_identification,
              col5: element_.identification,
              col6: element_.created
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
   * método que se encarga de manejar las peticiones cuando se escoge un producto
   */
  choose(element) {
    try {
      /**
       * si se está realizando la elección del item
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


  edit() {
    try {

    } catch (error) {
      this.appService.doCatch(error);
    }

  }

}
