import { Component, OnInit } from '@angular/core';
import { CityModel } from '../../city/city.model';
import { BrandModel } from '../../brand/brand.model';
import { KindModel } from '../../kind/kind.model';
import { ClientVehicleDTO } from '../client-vehicle-dto';
import { VehicleDTO } from '../vehicle-dto';
import { ClientModel } from '../../client/client.model';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {

  arrCity: Array<CityModel>;
  arrBrand: Array<BrandModel>;
  arrKind: Array<KindModel>;
  selectedCity: any;
  brandSelected: any;
  kindSelected: any;
  clientVehicleDTO: ClientVehicleDTO;
  ENROLLMENT_REQUIRED: string;
  BRAND_REQUIRED: string;
  CITY_REQUIRED: string;
  KIND_REQUIRED: string;
  selected:any;
  path: string;
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
  }

  reset() {
    this.arrBrand = new Array<BrandModel>();
    this.arrCity = new Array<CityModel>();
    this.arrKind = new Array<KindModel>();
    this.clientVehicleDTO = new ClientVehicleDTO();
    this.clientVehicleDTO.vehicle = new VehicleDTO();
    this.clientVehicleDTO.client = new ClientModel();
    this.getCitys();
    this.getBrands();
    this.getKinds();

    //this.validPath();

  }

  validPath() {
    const regNumber = /\d/;
    if (regNumber.test(this.path)) {
      this.getVehicle(`vehicle?id=${this.path}`);
      this.getClientVehicle();
    } else {
      this.path = 'vehicle';
    }
  }

  getVehicle(url) {
    this.appService.doGet(url)
      .then((r: VehicleDTO) => {
        this.clientVehicleDTO.vehicle = r;
        this.selected = this.clientVehicleDTO.vehicle.city.id.toString();
      })
      .catch(error => this.appService.doCatch(error));
  }

  getClientVehicle() {
    const url = 'clientVehicle?vehicle=' + this.path;
    this.appService.doGet(url)
      .then((r: any) => {
        this.clientVehicleDTO.client = r;
        console.log(r);
      })
      .catch(error => this.appService.doCatch(error));

  }

  /**
   * método para obtener las ciudades
   */
  getCitys() {
    const url = 'city';
    this.appService.doGet(url)
      .then((r: Array<CityModel>) => {
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
      .then((r: Array<BrandModel>) => {
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
      .then((r: Array<KindModel>) => {
        this.arrKind = r;
      })
      .catch(error => this.appService.doCatch(error));
  }


}
