import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FooterComponent,
      ],
      providers: [
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('should create, has a year variable and display it in html', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    const year = (new Date()).getFullYear();
    expect(component.year).toEqual(year);
    const footer = fixture.debugElement.queryAll(By.css('footer'));
    expect(footer.length).toEqual(1);
    expect(footer[0].nativeElement.innerHTML).toContain(year);
  });
});
