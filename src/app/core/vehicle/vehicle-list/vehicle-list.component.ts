import { ClientModel } from './../../client/client.model';
import { Component, OnInit, Input, Output, ViewChild, SimpleChanges, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import * as moment from 'moment';

import { AppService } from '../../../app.service';
import { VehicleDTO } from '../vehicle-dto';
import { ActivatedRoute, Router } from '@angular/router';


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
  arrVehicleDTO: Array<any>;
  path: any;

  addVehicleToggle: boolean;
  client: boolean;
  vehicleId: VehicleDTO;

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.params.forEach(params => {
      this.path = params['id'];
      this.reset();
    });
  }

  ngOnInit() {
    // Assign the data to the data source for the table to render   
  }


  reset() {
    const regNumber = /\d/;
    if (regNumber.test(this.path)) {
      this.path = `vehicle?brand=${this.path}`;
    } else {
      this.path = 'vehicle';
    }
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
        this.arrVehicleDTO = data;
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
    const url = (this.clientId != null) ? 'clientVehicle?client=' + this.clientId.id : this.path;
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

  /**
   * método que maneja la lógica para abrir el modal 
   * @param vehicle elemento tipo tabla de datos
   */
  selectVehicle(vehicle) {
    this.client = true;
    this.addVehicleToggle = true;
    const indexOfVehicle = this.arrVehicleDTO.findIndex(x => x.id === vehicle.col1);
    if (indexOfVehicle >= 0) {
      const vehicleDTO = new VehicleDTO();
      const tempData = this.arrVehicleDTO[indexOfVehicle];
      vehicleDTO.id = tempData.id;
      vehicleDTO.city = tempData.city;
      vehicleDTO.brand = tempData.brand;
      vehicleDTO.enrollment = tempData.enrollment;
      vehicleDTO.kind = tempData.kind;
      this.vehicleId = vehicleDTO;
      /* vehicleDTO.id = tempData.id;
      vehicleDTO.id = this.arrVehicleDTO[indexOfVehicle].id; */


    }
  }

  /**
   * método que determina si se actualizó el vehículo
   * @param $event boolean 
   */
  isUpdated($event) {

  }

  /**
   * método que valida si el modal se abre o se cierra
   * @param $event boolean
   */
  closeModal($event) {
    this.addVehicleToggle = $event;
  }


}
