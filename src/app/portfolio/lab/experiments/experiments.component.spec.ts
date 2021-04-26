import { Component, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ExperimentsComponent } from './experiments.component';

@Component({selector: 'pf-fake', template: ''})
export class FakeComponent {
}

describe('ExperimentsComponent', () => {
  let component: ExperimentsComponent;
  let fixture: ComponentFixture<ExperimentsComponent>;
  let router: Router;
  let dialogSpy: jasmine.Spy;
  let matDialog: MatDialog;
  const matDialogSpy = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  matDialogSpy.componentInstance = { body: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [
        ExperimentsComponent
      ],
      providers: [
        MatDialog
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentsComponent);
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(matDialogSpy);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    component.ngAfterViewInit();
    const config = {
      width: '90vh',
      disableClose: false,
      maxHeight: '90vh',
    };
    expect(dialogSpy).toHaveBeenCalledOnceWith(component.dialogTemplate, config);
  });

  it('should navigate home after closing dialog', () => {
    // dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(matDialogSpy);
    component.ngAfterViewInit();
    const config = {
      width: '90vh',
      disableClose: false,
      maxHeight: '90vh',
    };
    expect(matDialogSpy.afterClosed).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledOnceWith(['/'], {fragment: 'lab'});
  });
});
