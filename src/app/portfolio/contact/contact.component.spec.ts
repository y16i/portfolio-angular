import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WordpressApiService } from 'src/app/shared/services/wordpress-api.service';
import { IRendered, WordpressPage } from 'src/app/shared/services/wordpress-page.model';
import { SanitizeHtmlPipeStub } from 'src/testing/sanitize-html.pipe.stub';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let wordpressApiService: jasmine.SpyObj<WordpressApiService>;

  beforeEach(async () => {
    const wordpressServiceSpy = jasmine.createSpyObj('WordpressApiService', ['getPage']);
    await TestBed.configureTestingModule({
      declarations: [
        ContactComponent,
        SanitizeHtmlPipeStub
      ],
      providers: [
        {provide: WordpressApiService, useValue: wordpressServiceSpy},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
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
      title: <IRendered>{ rendered: 'Contact'},
      content: <IRendered>{ rendered: '<div>content</div>'}
    });
    wordpressApiService.getPage.and.returnValue(of([response]));
    fixture.detectChanges();
    expect(component.title).toEqual('Contact');
    expect(component.contentHtml).toEqual('<div>content</div>');
  });
});
