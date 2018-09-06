import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FilterDto } from "../filter.dto";
import { AppService } from "../../../app.service";

@Component({
  selector: "app-product-filters",
  templateUrl: "./product-filters.component.html",
  styleUrls: ["./product-filters.component.css"]
})
export class ProductFiltersComponent implements OnInit {
  options: FormGroup;
  filterDTO: FilterDto;
  minValue: number;
  maxValue: number;
  minQuantity: number;
  maxQuantity: number;
  quantitys: Array<number>;

  constructor(fb: FormBuilder, private appService: AppService) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: "auto"
    });
  }

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.filterDTO = new FilterDto();
    this.minQuantity = this.minValue;
    this.maxQuantity = this.maxValue = 100;
    this.quantitys = new Array<number>();
    this.generateQuantitys();
  }

  generateQuantitys() {
    try {
      //const q = parseInt(100, 0);
      const q = 100;
      for (let i = 1; i <= q; i++) {
        this.quantitys.push(i);
      }
    } catch (error) {
      this.appService.doCatch(error);
    }
  }
  multiply($event) {
    try {
      if ($event.value) {
        /* const clearPrice = this.productSelected.price
          .replace("$", "")
          .replace(",", "");
        const numberPrice = parseInt(clearPrice, 0);
        this.amount = numberPrice * $event.value; */
      }
    } catch (error) {}
  }
}
