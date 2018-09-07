import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductListService {
  private componentMethodCallSource = new Subject<any>();

  componentMethodCalled$ = this.componentMethodCallSource.asObservable();
  constructor() {}

  updateProductList(data) {
    console.log("servicio");
    this.componentMethodCallSource.next(data);
  }
}
