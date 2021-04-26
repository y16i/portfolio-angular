import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'sanitizeHtml'})
export class SanitizeHtmlPipeStub implements PipeTransform {
  transform(value: string): string {
    return 'sanitized';
  }
}
