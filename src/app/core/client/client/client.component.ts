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

  action: any;
  training: FormGroup;
  path: any;
  toppings = new FormControl();
  response: any;
  modal: ModalModel;
  title: string;
  uploadFile: any;

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
  }

  reset() {
    this.client = new ClientModel();
    this.states = new Array<StateModel>();

    this.client.state = new StateModel();
    this.modal = new ModalModel();
    const regNumber = /\d/;
    this.getStates();
    this.getVehicles();
    if (regNumber.test(this.path)) {
      this.path = `client?id=${this.path}`;
      this.find();
      this.action = 'Guardar cambios';
      this.title = 'Edición';
    } else {
      this.path = 'new';
      this.action = this.title = 'Creación';
    }

  }

  find() {
    this.appService.doGet(this.path)
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
    console.log(event);
    this.uploadFile = <File>$event.target.files[0];
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
      this.appService.doPost('client', fd)
        .then((response: any) => {
          this.validResponse(response);
        }).catch(e => this.appService.doCatch(e));


    }
  }

  minimumData() {
    /* let answer = false;
    if () {

    } */
    return true;
  }

  addVehicle(client: ClientModel) {
    this.addVehicleToggle = true;
  }



  validResponse(response: GeneralResponseDTO) {
    this.response = response;
    this.modal.body = response.message;
    if (response.state == true) {
      this.reset();
      this.modal.body = response.message;
    }
    this.appService.doModal(this.modal);
  }

  ngOnInit() {
  }

  getStates() {
    // this.validPath();
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

}
