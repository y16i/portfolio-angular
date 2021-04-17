import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'pf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private ngUnSubscribe: Subject<any> = new Subject();
  public formGroup: FormGroup;

  constructor(private renderer2: Renderer2) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  private initForm(): void {
    this.formGroup = new FormGroup({
      toggle: new FormControl(false)
    });

    // subscribe
    this.formGroup.controls['toggle'].valueChanges
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe(result => {
      if (result) {
        this.renderer2.removeClass(document.body, 'dark-theme');
        this.renderer2.addClass(document.body, 'light-theme');
      } else {
        this.renderer2.removeClass(document.body, 'light-theme');
        this.renderer2.addClass(document.body, 'dark-theme');
      }
    });
  }
}
