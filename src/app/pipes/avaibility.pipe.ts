import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avaibility'
})
export class AvaibilityPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let response = '';
    if (value == null) {
      return value;
    } else {
      if (value == true) {
        response = '<i class="fa fa-check"></i>';
      } else {
        response = '<i class="fa fa-times"></i>';
      }
    }
    return response;
  }
}
