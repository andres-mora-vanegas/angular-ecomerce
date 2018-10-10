import { ClientModel } from './../../client/client.model';
import { ClientVehicleDTO } from './../client-vehicle-dto';
import { BrandModel } from './../../brand/brand.model';
import { AppService } from './../../../app.service';
import { Component, OnInit, Input } from '@angular/core';
import { CityModel } from '../../city/city.model';
import { KindModel } from '../../kind/kind.model';

@Component({
  selector: 'app-vehicle-user-add',
  templateUrl: './vehicle-user-add.component.html',
  styleUrls: ['./vehicle-user-add.component.css']
})
export class VehicleUserAddComponent implements OnInit {

  arrCity: Array<CityModel>;
  arrBrand: Array<BrandModel>;
  arrKind: Array<KindModel>;
  clientVehicleDTO: ClientVehicleDTO;

  @Input()
  modal: boolean;

  @Input()
  clientId: ClientModel;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.arrBrand = new Array<BrandModel>();
    this.arrCity = new Array<CityModel>();
    this.arrKind = new Array<KindModel>();
    this.clientVehicleDTO = new ClientVehicleDTO();
    this.getCitys();
    this.getBrands();
    this.getKinds();
  }

  /**
   * método para obtener las ciudades
   */
  getCitys() {
    const url = 'city';
    this.appService.doGet(url)
      .then((r: any) => {
        this.arrCity = r;
      })
      .catch(error => this.appService.doCatch(error));
  }

  /**
   * método para obtener las marcas disponibles
   */
  getBrands() {
    const url = 'brand';
    this.appService.doGet(url)
      .then((r: any) => {
        this.arrBrand = r;
      })
      .catch(error => this.appService.doCatch(error));
  }

  /**
   * método para obtener los tipos de vehículos
   */
  getKinds() {
    const url = 'kind';
    this.appService.doGet(url)
      .then((r: any) => {
        this.arrKind = r;
      })
      .catch(error => this.appService.doCatch(error));
  }

  saveChanges(state = true) {
    if (state == false) {
      this.modal = false;
    } else {
      this.addClientVehicle();
    }
  }

  addClientVehicle() {
    const url = 'clientVehicle';
    this.appService
      .doPost(url, this.clientVehicleDTO)
      .then((r: any) => {

      })
      .catch(error => this.appService.doCatch(error));
  }

}
