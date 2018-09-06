import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges, OnChanges } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FilterDto } from "../filter.dto";
import { AppService } from "../../../app.service";

@Component({
  selector: "app-product-filters",
  templateUrl: "./product-filters.component.html",
  styleUrls: ["./product-filters.component.css"]
})
export class ProductFiltersComponent implements OnInit, OnChanges {
  options: FormGroup;
  filterDTO: FilterDto;
  minValue: number;
  maxValue: number;
  minQuantity: number;
  maxQuantity: number;
  quantitys: Array<number>;
  @Input()
  dataResult: Array<any>;
  @Output()
  filterDtoOut = new EventEmitter<FilterDto>();
  availity: Array<any>;

  constructor(
    /* fb: FormBuilder,  */
    private appService: AppService
  ) {
    /* this.options = fb.group({
      hideRequired: false,
      floatLabel: "auto"
    }); */
  }

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.filterDTO = new FilterDto();
    this.minQuantity = this.minValue = Number.POSITIVE_INFINITY;
    this.maxQuantity = this.maxValue = Number.NEGATIVE_INFINITY;
    this.quantitys = new Array<number>();
    this.generateAvaility();
  }

  generateAvaility() {
    this.availity = [];
    this.availity.push({ state: true, name: 'Si' });
    this.availity.push({ state: false, name: 'No' });
  }

  generateAmmounts() {
    try {
      if (this.dataResult.length > 0) {
        this.dataResult.forEach(element => {
          if (
            element.price != null &&
            element.quantity != null
          ) {
            const clearPrice = parseInt(element.price.replace(/\$|,/g, ""), 0);
            if (clearPrice < this.minValue) {
              this.minValue = clearPrice;
            }
            if (clearPrice > this.maxValue) {
              this.maxValue = clearPrice;
            }
            if (element.quantity < this.minQuantity) {
              this.minQuantity = element.quantity;
            }
            if (element.quantity > this.maxQuantity) {
              this.maxQuantity = element.quantity;
            }
          }
        });
      }
    } catch (error) {
      this.appService.doCatch(error);
    }

  }

  doPost($event) {
    try {
      this.filterDtoOut.emit(this.filterDTO);
    } catch (error) {
      this.appService.doCatch(error);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    try {
      if (
        changes.dataResult != null &&
        changes.dataResult.currentValue != null &&
        changes.dataResult.currentValue.length > 0
      ) {
        this.generateAmmounts();
      }
    } catch (error) {
      this.appService.doCatch(error);
    }
  }
}
