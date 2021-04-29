import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLibrariesComponent } from './chart-libraries.component';

xdescribe('ChartLibrariesComponent', () => {
  let component: ChartLibrariesComponent;
  let fixture: ComponentFixture<ChartLibrariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartLibrariesComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartLibrariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
