import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clearCaracters'
})
export class ClearCaractersPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let response = '';
    if (value == null) {
      return value;
    } else {
      response = value.replace(/[,\$]/g, '');
    }
    return response;
  }


}
