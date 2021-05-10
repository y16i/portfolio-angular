import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeLinkComponent } from './code-link.component';

xdescribe('CodeLinkComponent', () => {
  let component: CodeLinkComponent;
  let fixture: ComponentFixture<CodeLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeLinkComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
