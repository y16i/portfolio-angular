import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SanitizeHtmlPipe } from 'src/app/shared/pipes/sanitize-html.pipe';
import { WordpressApiService } from 'src/app/shared/services/wordpress-api.service';
import { IRendered, WordpressPage } from 'src/app/shared/services/wordpress-page.model';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let wordpressApiService: jasmine.SpyObj<WordpressApiService>;

  beforeEach(async () => {
    const wordpressServiceSpy = jasmine.createSpyObj('WordpressApiService', ['getPage']);
    await TestBed.configureTestingModule({
      declarations: [
        AboutComponent,
        SanitizeHtmlPipe
      ],
      providers: [
        {provide: WordpressApiService, useValue: wordpressServiceSpy},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    wordpressApiService = TestBed.inject(WordpressApiService) as jasmine.SpyObj<WordpressApiService>;
    component = fixture.componentInstance;
  });

  it('should create', () => {
     const response: WordpressPage = {
      id: 1,
      title: <IRendered>{ rendered: ''},
      content: <IRendered>{ rendered: ''}
    };
    wordpressApiService.getPage.and.returnValue(of([response]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get title and content', () => {
     const response: WordpressPage = {
      id: 1,
      title: <IRendered>{ rendered: 'About'},
      content: <IRendered>{ rendered: '<div>content</div>'}
    };
    wordpressApiService.getPage.and.returnValue(of([response]));
    fixture.detectChanges();
    expect(component.title).toEqual('About');
    expect(component.contentHtml).toEqual('<div>content</div>');
  });

  it('should work sanitizeHtml pipe', () => {
    const html = '<div>test<script>alert(1);</script></div>';
     const response: WordpressPage = {
      id: 1,
      title: <IRendered>{ rendered: 'About'},
      content: <IRendered>{ rendered: html}
    };
    wordpressApiService.getPage.and.returnValue(of([response]));
    const element = fixture.nativeElement;
    const nameDisplay: HTMLElement = element.querySelector('.content');
    fixture.detectChanges();
    expect(nameDisplay.innerHTML).toEqual('<div>test</div>');
  });
});
