import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'


@Pipe({
  name: 'safeHtml',
  pure: true
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: any): any {
    if (value === '' || typeof value === 'undefined') {
      return '';
    }
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
