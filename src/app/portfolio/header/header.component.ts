import { Component, OnInit, Renderer2 } from '@angular/core';
import { Theme } from '../theme.enum';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'pf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public toggle: boolean = true;
  public theme = Theme;

  constructor(private renderer2: Renderer2,
              private themeService: ThemeService) {
  }

  ngOnInit(): void {
  }

  public switchMode(newTheme: Theme) {
    if (!this.toggle && newTheme === Theme.light) {
      this.toggle = true;
      this.renderer2.removeClass(document.body, Theme.dark);
      this.renderer2.addClass(document.body, Theme.light);
      this.themeService.changeTo(Theme.light);
    } else if (this.toggle && newTheme === Theme.dark) {
      this.toggle = false;
      this.renderer2.removeClass(document.body, Theme.light);
      this.renderer2.addClass(document.body, Theme.dark);
      this.themeService.changeTo(Theme.dark);
    }
  }
}
