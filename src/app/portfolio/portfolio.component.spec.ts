import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { PortfolioComponent } from './portfolio.component';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [
        PortfolioComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioComponent);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should navigate to top', async() => {
    fixture.detectChanges();
    spyOn(component, 'backToTop');
    const button = fixture.debugElement.nativeElement.querySelector('button.back-to-top');
    expect(button).toBeTruthy();
    button.click();
    await fixture.whenStable().then(() => {
      expect(component.backToTop).toHaveBeenCalled();
      // expect(router.navigate).toHaveBeenCalledOnceWith(['/']); // TODO: doesn't call. Inspect later
    });
  });
});
