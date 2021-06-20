import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WordpressApiService } from 'src/app/shared/services/wordpress-api.service';
import { WordpressPageMin } from 'src/app/shared/services/wordpress-page.model';

@Component({
  selector: 'pf-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit, OnDestroy {
  private ngUnSubscribe: Subject<any> = new Subject();
  public contentHtml: string
  public title: string;

  constructor(private wordpressService: WordpressApiService) {
  }

  ngOnInit(): void {
    this.getContent();
  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  private getContent() {
    this.wordpressService.getPage('portfolio-about')
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((json: WordpressPageMin[]) => {
        if (json?.length > 0) {
          this.contentHtml = json[0].content?.rendered;
          this.title = json[0].title?.rendered;
        }
      });
  }
}
