import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoBackendComponent } from './go-backend.component';

xdescribe('GoBackendComponent', () => {
  let component: GoBackendComponent;
  let fixture: ComponentFixture<GoBackendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoBackendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
