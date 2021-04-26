import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SanitizeHtmlPipe } from 'src/app/shared/pipes/sanitize-html.pipe';
import { WordpressApiService } from 'src/app/shared/services/wordpress-api.service';
import { IRendered, WordpressPage } from 'src/app/shared/services/wordpress-page.model';

import { LabComponent } from './lab.component';

describe('LabComponent', () => {
  let component: LabComponent;
  let fixture: ComponentFixture<LabComponent>;
  let wordpressApiService: jasmine.SpyObj<WordpressApiService>;

  beforeEach(async () => {
    const wordpressServiceSpy = jasmine.createSpyObj('WordpressApiService', ['getPage']);
    await TestBed.configureTestingModule({
      declarations: [
        LabComponent,
        SanitizeHtmlPipe
      ],
      providers: [
        {provide: WordpressApiService, useValue: wordpressServiceSpy},
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabComponent);
    wordpressApiService = TestBed.inject(WordpressApiService) as jasmine.SpyObj<WordpressApiService>;
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
      title: <IRendered>{ rendered: 'Experience'},
      content: <IRendered>{ rendered: '<div>content</div>'}
    });
    wordpressApiService.getPage.and.returnValue(of([response]));
    fixture.detectChanges();
    expect(component.title).toEqual('Experience');
    expect(component.contentHtml).toEqual('<div>content</div>');
  });
});
