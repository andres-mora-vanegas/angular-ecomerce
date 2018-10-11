import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StateModel } from '../../state/state.model';
import { ClientModel } from '../client.model';
import { ModalModel } from '../../../shared/modal/modal.model';
import { GeneralResponseDTO } from '../../../shared/generarResponse/general-response-dto';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  client: ClientModel;
  states: Array<StateModel>;
  DATA_PENDING: string;

  action: any;
  training: FormGroup;
  path: any;
  toppings = new FormControl();
  response: any;
  modal: ModalModel;
  title: string;
  uploadFile: any;
  vehicleList: boolean;

  addVehicleToggle: boolean;


  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.params.forEach(params => {
      this.path = params['id'];
      this.reset();
    });
    this.DATA_PENDING = 'Faltan datos por registrar';
  }

  reset() {
    this.client = new ClientModel();
    this.states = new Array<StateModel>();

    this.client.state = new StateModel();
    this.modal = new ModalModel();
    const regNumber = /\d/;
    this.getVehicles();
    if (regNumber.test(this.path)) {
      this.getStates();
      this.find(`client?id=${this.path}`);
      this.action = 'Guardar cambios';
      this.title = 'Edición';
      this.vehicleList = true;
    } else {
      this.path = 'new';
      this.action = this.title = 'Creación';
    }

  }

  find(url) {
    this.appService.doGet(url)
      .then((response: any) => {
        let res = response;
        if (res.length > 0) {
          res = res[0];
        }
        this.client = res;
      })
      .catch(e => {
        this.appService.handleError(e);
      });
  }

  upload($event) {
    try {
      this.uploadFile = <File>$event.target.files[0];
      this.uploadFile = $event.target.files[0];
    }
    catch (error) {
      this.appService.doCatch(error);
    }


  }

  /**
   * método que se encarga de guardar el registro.
   */
  doPost(event) {
    event.preventDefault();
    if (this.minimumData()) {
      const fd = new FormData();

      fd.append('scanned_identification', this.uploadFile, this.uploadFile.name);
      fd.append('first_name', this.client.first_name);
      fd.append('last_name', this.client.last_name);
      fd.append('email', this.client.email);
      fd.append('identification', this.client.identification);
      if (this.client.id != null) {
        fd.append('id', this.client.id.toString());
      }
      this.appService.doPost('client/', fd)
        .then((response: any) => {
          this.validResponse(response);
        }).catch(e => this.appService.doCatch(e));
    } else {
      this.appService.snack(this.DATA_PENDING);
    }
  }

  /**
   * método que recibe el cierre del modal desde el elemento hijo
   * @param $event boolean que determina el estado del modal, true open, false close
   */
  closeModal($event) {
    this.addVehicleToggle = $event;
  }

  minimumData() {
    let answer = false;
    if (
      this.uploadFile != null &&
      this.client.first_name != null && this.client.first_name != '' &&
      this.client.last_name != null && this.client.last_name != '' &&
      this.client.email != null && this.client.email != '' &&
      this.client.identification != null && this.client.identification != ''
    ) {
      answer = true;
    }
    return answer;
  }

  addVehicle(client: ClientModel) {
    this.addVehicleToggle = true;
  }



  validResponse(response: any) {
    this.response = response;
    this.modal.body = response.message;
    let responseMessage = '';
    if (response.id) {
      this.client = response;
      this.title = 'Edición';
      responseMessage = 'Usuario registrado correctamente';
    } else if (response.state != null && response.state == false) {
      responseMessage = response.message;
    }
    this.appService.snack(responseMessage);
  }

  ngOnInit() {
  }

  getStates() {
    this.appService.doGet('states')
      .then((response: any) => {
        this.states = response.results;
      }).catch(e => {
        this.appService.doCatch(e);
      });
  }

  getVehicles() {
    // this.validPath();
    try {
      if (this.client.id != null) {
        const url = 'clientVehicle?clientId=' + this.client.id;
        this.appService.doGet(url)
          .then((response: Array<any>) => {
            // this.vehicles = response;
          }).catch(e => {
            this.appService.doCatch(e);
          });
      }
    } catch (error) {
      this.appService.doCatch(error);
    }

  }

  isCreated($event) {
    if ($event == true) {
      this.vehicleList = false;
      this.vehicleList = true;
      this.addVehicleToggle = false;
    }
  }

}
