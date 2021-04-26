import { NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Theme } from '../theme.enum';
import { ThemeService } from '../theme.service';

import { HeaderComponent } from './header.component';

class ThemeServiceStub {
  changeTo() {};
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
    themeService.changeTo = () => {};
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should be sun button is disabled and called switchMode() when use click moon icon', async() => {
    spyOn(component, 'switchMode');
    fixture.detectChanges();
    const buttonDisabled = fixture.debugElement.nativeElement.querySelector('button.sun').disabled;
    expect(buttonDisabled).toBeTruthy();
    const moonButton = fixture.debugElement.nativeElement.querySelector('button.moon');
    expect(moonButton).toBeTruthy();
    moonButton.click();
    await fixture.whenStable().then(() => {
      expect(component.switchMode).toHaveBeenCalledOnceWith(Theme.dark);
    });
  });

  it('should be moon button is disabled and called switchMode() when use click sun icon', async() => {
    spyOn(component, 'switchMode');
    component.toggle = false;
    fixture.detectChanges();
    const buttonDisabled = fixture.debugElement.nativeElement.querySelector('button.moon').disabled;
    expect(buttonDisabled).toBeTruthy();
    const sunButton = fixture.debugElement.nativeElement.querySelector('button.sun');
    expect(sunButton).toBeTruthy();
    sunButton.click();
    await fixture.whenStable().then(() => {
      expect(component.switchMode).toHaveBeenCalledOnceWith(Theme.light);
    });
  });
});
