import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'pf-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExperimentsComponent implements OnInit, AfterViewInit {
  @ViewChild('ExperimentDialogFrame') dialogTemplate: TemplateRef<any>;

  constructor(private matDialog: MatDialog,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dispatchDialog();
  }

  private dispatchDialog(): void {
    const dialog = this.matDialog.open(this.dialogTemplate, {
      width: '800px',
      disableClose: false,
    });

    dialog.afterOpened()
    .pipe(take(1))
    .subscribe(() => {
      this.router.navigate(['chart-libraries'], {
        relativeTo: this.activatedRoute,
        skipLocationChange: true,
      });
    });

    dialog.afterClosed()
    .pipe(take(1))
    .subscribe(() => {
      this.router.navigate(['/'], {fragment: 'lab'});
    });
  }
}
