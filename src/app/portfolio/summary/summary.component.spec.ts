import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { WordpressApiService } from 'src/app/shared/services/wordpress-api.service';
import { IRendered, WordpressPage } from 'src/app/shared/services/wordpress-page.model';
import { SanitizeHtmlPipeStub } from 'src/testing/sanitize-html.pipe.stub';
import { Theme } from '../theme.enum';
import { ThemeService } from '../theme.service';

import { SummaryComponent } from './summary.component';

class ThemeServiceStub {
  theme$ = of({});
}

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  let wordpressApiService: jasmine.SpyObj<WordpressApiService>;
  let themeService: ThemeService;
  beforeEach(async () => {
    const wordpressServiceSpy = jasmine.createSpyObj('WordpressApiService', ['getPage']);
    await TestBed.configureTestingModule({
      declarations: [
        SummaryComponent,
        SanitizeHtmlPipeStub,
      ],
      providers: [
        {provide: WordpressApiService, useValue: wordpressServiceSpy},
        {provide: ThemeService, useValue: ThemeServiceStub}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    wordpressApiService = TestBed.inject(WordpressApiService) as jasmine.SpyObj<WordpressApiService>;
    themeService = TestBed.inject(ThemeService);
    themeService.theme$ = of(Theme.light); // default is light-theme
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const response = new WordpressPage({
      id: 1,
      title: <IRendered>{ rendered: ''},
      content: <IRendered>{ rendered: ''}
    });
    wordpressApiService.getPage.and.returnValue(of([response]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get title and content', () => {
    const response = new WordpressPage({
      id: 1,
      title: <IRendered>{ rendered: 'Summary'},
      content: <IRendered>{ rendered: '<div>content</div>'}
    });
    wordpressApiService.getPage.and.returnValue(of([response]));
    fixture.detectChanges();
    expect(component.title).toEqual('Summary');
    expect(component.contentHtml).toEqual('<div>content</div>');
  });

  it('should be light theme', () => {
    const response = new WordpressPage({
      id: 1,
      title: <IRendered>{ rendered: ''},
      content: <IRendered>{ rendered: ''}
    });
    wordpressApiService.getPage.and.returnValue(of([response]));
    // set light-theme
    // themeService.theme$ = of(Theme.light);
    fixture.detectChanges();

    const content = fixture.debugElement.queryAll(By.css('.light'));
    expect(content.length).toEqual(1);
  });

  it('should be dark theme', () => {
    const response = new WordpressPage({
      id: 1,
      title: <IRendered>{ rendered: ''},
      content: <IRendered>{ rendered: ''}
    });
    wordpressApiService.getPage.and.returnValue(of([response]));
    themeService.theme$ = of(Theme.dark);
    fixture.detectChanges();
    const content = fixture.debugElement.queryAll(By.css('.dark'));
    expect(content.length).toEqual(1);
  });
});
