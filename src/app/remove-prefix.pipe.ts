import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removePrefix'
})
export class RemovePrefixPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value.replace(/^.*\d+-/, '');
  }

}
