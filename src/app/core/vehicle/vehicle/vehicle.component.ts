import { FormControl } from '@angular/forms';
import { ClientModel } from './../../client/client.model';
import { ClientVehicleDTO } from './../client-vehicle-dto';
import { BrandModel } from './../../brand/brand.model';
import { AppService } from './../../../app.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CityModel } from '../../city/city.model';
import { KindModel } from '../../kind/kind.model';
import { VehicleDTO } from '../vehicle-dto';
import { GeneralResponseDTO } from '../../../shared/generarResponse/general-response-dto';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  arrCity: Array<CityModel>;
  arrBrand: Array<BrandModel>;
  arrKind: Array<KindModel>;
  citySelected: any;
  brandSelected: any;
  kindSelected: any;
  clientVehicleDTO: ClientVehicleDTO;
  ENROLLMENT_REQUIRED: string;
  BRAND_REQUIRED: string;
  CITY_REQUIRED: string;
  KIND_REQUIRED: string;
  selected = 'option3'

  @Input()
  modal: boolean;

  @Input()
  clientId: ClientModel;

  @Input()
  vehicleId: VehicleDTO;

  @Output()
  closeModal = new EventEmitter<any>();

  @Output()
  created = new EventEmitter<any>();

  constructor(
    private appService: AppService
  ) {
    this.ENROLLMENT_REQUIRED = 'Se debe registrar la matrícula';
    this.BRAND_REQUIRED = 'Se debe escoger una marca de vehículo';
    this.CITY_REQUIRED = 'Se debe escoger una ciudad de origen';
    this.KIND_REQUIRED = 'Se debe escoger un tipo de vehículo';
  }

  ngOnInit() {
    this.reset();
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
    //this.validVehicleCall();
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

  saveChanges(state = true) {
    if (state == false) {
      this.modal = false;
      this.closeModal.emit(this.modal);
    } else {
      this.clientVehicleDTO.client = this.clientId;
      this.validMinimumData();
      if (this.validMinimumData() != false) {
        this.addClientVehicle();
      }

    }
  }

  validMinimumData() {
    try {
      let errors = 0;
      console.log(this.clientVehicleDTO);
      if (this.clientVehicleDTO.vehicle.enrollment == null) {
        this.appService.snack('No se ha registrado toda la información');
        errors++;
      }
      // if (this.clientVehicleDTO.vehicle.brand == null) {
      //   this.appService.snack(this.BRAND_REQUIRED, null, 1000);
      //   errors++;
      // }
      // if (this.clientVehicleDTO.vehicle.kind == null) {
      //   this.appService.snack(this.KIND_REQUIRED, null, 1000);
      //   errors++;
      // }
      // if (this.clientVehicleDTO.vehicle.city == null) {
      //   this.appService.snack(this.CITY_REQUIRED, null, 1000);
      //   errors++;
      // }
      if (errors > 0) {
        return false;
      }
    } catch (error) {
      this.appService.doCatch(error);
    }

  }

  addClientVehicle() {
    const url = (this.vehicleId == null) ? 'manageVehicle/enroll' : 'vehicle/';
    console.log(this.clientVehicleDTO);
    this.appService
      .doPost(url, this.clientVehicleDTO)
      .then((r: GeneralResponseDTO) => {
        this.validResponse(r);
      })
      .catch(error => this.appService.doCatch(error));
  }

  validResponse(response: GeneralResponseDTO) {
    try {
      if (response.state == true) {
        this.created.emit(true);
      }
      this.appService.snack(response.message);
    } catch (error) {
      this.appService.doCatch(error);
    }
  }

  validVehicleCall() {
    try {
      if (this.vehicleId != null) {
        this.clientVehicleDTO.vehicle = this.vehicleId;
      }
    } catch (error) {
      this.appService.doCatch(error);
    }
  }

}
