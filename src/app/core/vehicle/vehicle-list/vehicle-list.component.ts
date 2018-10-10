import { ClientModel } from './../../client/client.model';
import { Component, OnInit, Input, Output, ViewChild, SimpleChanges, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FilterDto } from '../../product/filter.dto';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import * as moment from 'moment';

import { AppService } from '../../../app.service';
import { VehicleDTO } from '../vehicle-dto';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  displayedColumns = ['col2', 'col3', 'col4', 'col5', 'col6', 'col7'];
  dataSource: MatTableDataSource<any>;

  @Input()
  clientId: ClientModel;

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
   * método que se encarga de convertir el array de respuesta del servicio en datos para la tabla
   * @param data datos que se obtuvieron en la consulta
   * @param cb callback que se encarga de aplicar filtros adicionales
   */
  converDataToDataTable(data: any, cb = null) {
    try {
      const localData = [];
      if (data.length > 0) {
        this.arrayData = [];
        data.forEach((element: any) => {
          let element_ = element;
          if (element_.id != null) {
            localData.push(element_);
            if (element.vehicle != null) {
              element_ = element_.vehicle;
            }
            const arrayItem = {
              col1: element_.id,
              col2: element_.enrollment,
              col3: element_.city.name,
              col4: element_.city.country.name,
              col5: element_.brand.name,
              col6: element_.brand.image,
              col7: element_.kind.name
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
   * método que se encarga de consultar los datos del backend
   * @param cb callback que ejecutará filtros adicionales sobre los registros obtenidos
   */
  getVehicles(cb = null) {
    let url = 'vehicles';
    if (this.clientId != null) {
      url = 'clientVehicle?client=' + this.clientId.id;
    }
    this.appService
      .doGet(url)
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


    } catch (error) { }
  }


  edit() {
    try {

    } catch (error) {
      this.appService.doCatch(error);
    }

  }

  /**
   * método que permite descargar el archivo csv de la tabla
   */
  getCSVDownloadLink() {
    const obj = this.arrayData;
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      noDownload: false,
      headers: [
        'id',
        'Placa',
        'Ciudad',
        'País',
        'Marca',
        'Imágen',
        'Tipo'
      ]
    };
    const DATE = moment().format('YYYY_MM_DD_hmmss');
    const fileName = 'vehículos_' + DATE;
    new Angular5Csv(obj, fileName, options);
  }


}
