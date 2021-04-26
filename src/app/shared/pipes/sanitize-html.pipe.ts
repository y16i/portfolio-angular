import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'


@Pipe({
  name: 'sanitizeHtml',
  pure: true
})
export class SanitizeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: any): any {
    if (value === '' || typeof value === 'undefined') {
      return '';
    }
    return this.sanitized.sanitize(SecurityContext.HTML, value);
  }
}
