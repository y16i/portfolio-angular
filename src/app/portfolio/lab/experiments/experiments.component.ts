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
    this.configureDialog();
  }

  private configureDialog(): void {
    const dialog = this.matDialog.open(this.dialogTemplate, {
      width: '90vh',
      disableClose: false,
      maxHeight: '90vh',
    });

    dialog.afterClosed()
    .pipe(take(1))
    .subscribe(() => {
      this.router.navigate(['/'], {fragment: 'lab'});
    });
  }
}
