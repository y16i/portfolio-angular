import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WordpressApiService } from 'src/app/shared/services/wordpress-api.service';
import { WordpressPageMin } from 'src/app/shared/services/wordpress-page.model';
import { Theme } from '../theme.enum';
import { ThemeService } from '../theme.service';

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
  public currentTheme: Theme;
  public theme = Theme;

  constructor(private themeService: ThemeService,
              private wordpressService: WordpressApiService) {
  }


  ngOnInit(): void {
    this.getContent();
    this.themeService.theme$
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((newTheme: Theme) => {
        this.currentTheme = newTheme;
      });
  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  private getContent() {
    this.wordpressService.getPage(undefined)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((json: WordpressPageMin[]) => {
        if (json?.length > 0) {
          this.contentHtml = json[0].content?.rendered;
          this.title = json[0].title?.rendered;
        }
      });
  }
}
