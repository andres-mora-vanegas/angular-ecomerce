import { Component, OnInit, Input } from "@angular/core";
import { SaleDto } from "../sale.dto";
import { AppService } from "../../../app.service";
import { ProductModel } from "../../product/product.model";

@Component({
  selector: "app-sale-detail",
  templateUrl: "./sale-detail.component.html",
  styleUrls: ["./sale-detail.component.css"]
})
export class SaleDetailComponent implements OnInit {
  @Input()
  arrSaleDto: Array<SaleDto>;
  saleDto: SaleDto;
  modal: boolean;
  quantitys: number[];
  amount: number;
  temporalQuantity: number;
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.quantitys = new Array<number>();
    this.temporalQuantity = 0;
    this.modal = false;
    this.saleDto = new SaleDto();
    this.saleDto.product = new ProductModel();
  }

  multiply($event) {
    try {
      if ($event.value) {
        const clearPrice = this.saleDto.product.price
          .replace("$", "")
          .replace(",", "");
        const numberPrice = parseInt(clearPrice, 0);
        this.amount = numberPrice * $event.value;
      }
    } catch (error) {
      this.appService.doCatch(error);
    }
  }
  generateQuantitys() {
    try {
      const q = parseInt(this.saleDto.product.quantity, 0);
      for (let i = 1; i <= q; i++) {
        this.quantitys.push(i);
      }
    } catch (error) {
      this.appService.doCatch(error);
    }
  }

  edit(item: SaleDto) {
    this.saleDto = item;
    this.generateQuantitys();
    this.temporalQuantity = item.quantity;
    this.modal = true;
  }

  saveChanges(state = true) {
    if (state == false) {
      this.modal = false;
      this.saleDto.quantity = this.temporalQuantity;
    } else {
      this.arrSaleDto.forEach((element: SaleDto) => {
        if (
          element.product.id == this.saleDto.product.id &&
          element.quantity == this.saleDto.quantity
        ) {
          element = this.saleDto;
        }
      });
      this.reset();
    }
  }
}
