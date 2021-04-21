import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value || typeof value !== 'string') {
      return value;
    }
    return value.replace(/[^A-Za-z0-9]+(\w|$)/g, (_, letter) => {
      return letter.toUpperCase();
    }).replace(/^(.)/, (_, letter) => {
      return letter.toLowerCase();
    });
  }
}
