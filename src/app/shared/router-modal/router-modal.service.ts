import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class RouterModalService {

  private componentMethodCallSource = new Subject<any>();

  componentMethodCalled$ = this.componentMethodCallSource.asObservable();
  constructor() { }

  /**
   * método que recibe la ruta que navegará
   * @param data
   */
  navigateAndModal(data) {
    this.componentMethodCallSource.next(data);
  }

}
