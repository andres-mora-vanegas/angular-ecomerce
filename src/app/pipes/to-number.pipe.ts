import { Pipe, PipeTransform } from "@angular/core";
import { formatNumber, CurrencyPipe } from "@angular/common";

@Pipe({
  name: "toNumber"
})
export class ToNumberPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let response = "";
    if (value == null) {
      return value;
    } else {
      const clear = parseInt(value.replace(",", "").replace("$", ""), 0);
      let operation = clear * args;
      response = "$ " + operation;
    }
    return response;
  }
}
