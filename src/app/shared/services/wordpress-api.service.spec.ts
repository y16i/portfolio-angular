import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { WordpressApiService } from './wordpress-api.service';
import { WordpressPageMin } from './wordpress-page.model';

describe('WordpressApiService', () => {
  let wordPressService: WordpressApiService;
  let httpClientSpy: { get: jasmine.Spy };
  let wordpressApiServiceSpy: WordpressApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    wordpressApiServiceSpy = new WordpressApiService(httpClientSpy as any);
    wordPressService = TestBed.inject(WordpressApiService);
  });

  it('should be created', () => {
    expect(wordPressService).toBeTruthy();
  });

  it('should return expected wp page', () => {
    const response: WordpressPageMin[] = [{
      id: 0,
      title: {
        rendered: "title 01"
      },
      content: {
        rendered: "body",
        protected: true
      }
    }];
    httpClientSpy.get.and.returnValue(of(response));
    wordPressService.getPage('about').subscribe(
      result => {
        expect(result).toEqual(response)
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
      },
      error => {
        fail
      });
  });

  it('should return an error when server return 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: '404 error test',
      status: 404,
      statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(of(errorResponse));
    wordPressService.getPage('about').subscribe(
      result => {
        console.log(result);
        fail('expected an error, not wp page content');
      },
      error  => {
        console.log(error);
        expect(error.message).toContain('404 error test');
      }
    );
  });
});
