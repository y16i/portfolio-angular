import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WordpressApiService } from 'src/app/shared/services/wordpress-api.service';

@Component({
  selector: 'pf-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SummaryComponent implements OnInit, OnDestroy {
  private ngUnSubscribe: Subject<any> = new Subject();
  public contentHtml: string
  public title: string;


  constructor(@Inject(DOCUMENT) public document: Document,
              private wordpressService: WordpressApiService) {
  }


  ngOnInit(): void {
    this.getContent();
  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  private getContent() {
    this.wordpressService.getPage('portfolio-summary')
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe((json: any) => {
      if (json?.length > 0) {
        this.contentHtml = json[0].content?.rendered;
        this.title = json[0].title?.rendered;
      }
    });
  }
}
