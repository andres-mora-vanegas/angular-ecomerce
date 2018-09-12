import { Component, OnInit, EventEmitter } from '@angular/core';
import { RouterModalService } from './router-modal.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-router-modal',
  templateUrl: './router-modal.component.html',
  styleUrls: ['./router-modal.component.css']
})
export class RouterModalComponent implements OnInit {



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
    
  }

  /**
   * método que cierra el modal
   */
  closeModal() {
    this.router.navigate([{ outlets: { modal: null } }]);
    
  }

}
