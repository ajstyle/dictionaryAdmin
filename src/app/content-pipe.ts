import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'contentLimit'})
export class ContentPipe implements PipeTransform {
  transform(value: string): string {
  const val = value.substring(0, 100) + '...';
    return val  ;
  }
}
