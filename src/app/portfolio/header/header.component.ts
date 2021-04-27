import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Theme } from '../theme.enum';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'pf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private ngUnSubscribe: Subject<any> = new Subject();
  public theme = Theme;
  public currentTheme: Theme;

  constructor(private renderer2: Renderer2,
              private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.themeService.theme$
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe((theme: Theme) => {
      if (this.currentTheme !== theme) {
        this.currentTheme = theme;
      }
    });
  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  public switchMode() {
    if (this.currentTheme === Theme.light) {
      this.renderer2.removeClass(document.body, Theme.light);
      this.renderer2.addClass(document.body, Theme.dark);
      this.currentTheme = Theme.dark;
    } else if (this.currentTheme === Theme.dark) {
      this.renderer2.removeClass(document.body, Theme.dark);
      this.renderer2.addClass(document.body, Theme.light);
      this.currentTheme = Theme.light;
    }
    this.themeService.changeTo(this.currentTheme);
  }
}
