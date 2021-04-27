import { NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Theme } from '../theme.enum';
import { ThemeService } from '../theme.service';

import { HeaderComponent } from './header.component';

class ThemeServiceStub {
  changeTo(theme: Theme) {};
  theme$ = of({});
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
       ],
      providers: [
        Renderer2,
        {provide: ThemeService, useValue: ThemeServiceStub}
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    themeService = TestBed.inject(ThemeService);
    themeService.theme$ = of(Theme.light); // default is light-theme
    themeService.changeTo = (theme: Theme) => {};
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should theme button call themeService.changeTo() when use click moon icon', () => {
    spyOn(themeService, 'changeTo');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button.moon');
    expect(button).toBeTruthy();
    button.click();
    expect(themeService.changeTo).toHaveBeenCalledOnceWith(Theme.dark);
  });

  it('should show sun icon when theme is dark theme', () => {
    themeService.theme$ = of(Theme.dark); // default is light-theme
    // component.currentTheme = Theme.dark;
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button.sun');
    expect(button).toBeTruthy();
  });
});
