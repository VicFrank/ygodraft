import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDescription',
  standalone: false,
})
export class FormatDescriptionPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .replace(/\.\)/g, ')\n') // replace .) with )\n
      .replace(/\.(?!\))/g, '.\n'); // add \n after periods not followed by )
  }
}
