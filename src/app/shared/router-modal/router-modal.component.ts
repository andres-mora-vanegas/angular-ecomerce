import { Component, OnInit, EventEmitter } from '@angular/core';
import { RouterModalService } from './router-modal.service';
import { MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';

@Component({
  selector: 'app-router-modal',
  templateUrl: './router-modal.component.html',
  styleUrls: ['./router-modal.component.css']
})
export class RouterModalComponent implements OnInit {

  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(
    private routerModalService: RouterModalService,
    private router: Router
  ) {
    this.routerModalService.componentMethodCalled$.subscribe(
      (data) => {
        this.navigateAndModal(data);
      }
    );
  }

  ngOnInit() {
  }

  /**
   * método que abre el modal y navega el router
   * @param data
   */
  navigateAndModal(data) {
    this.router.navigate([{ outlets: { modal: [data] } }]);
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }

  /**
   * método que cierra el modal
   */
  closeModal() {
    this.router.navigate([{ outlets: { modal: null } }]);
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  }

}
