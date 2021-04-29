import { inject, TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';


describe('SanitizeHtmlPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule
      ]
    });
  });

  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SanitizeHtmlPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));

  it('should return "" when pass undefined', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SanitizeHtmlPipe(domSanitizer);
    expect(pipe.transform(undefined)).toEqual('');
  }));

  it('should return "" when pass ""', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SanitizeHtmlPipe(domSanitizer);
    expect(pipe.transform('')).toEqual('');
  }));

  it('should clean a dirty html',  inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SanitizeHtmlPipe(domSanitizer);
    const html = '<div>test<script>alert(1);</script></div>';
    const transformed = pipe.transform(html);
    expect(transformed).toEqual('<div>test</div>');
  }));

  // about.spec.ts has a test for this.
});
