import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'pf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public toggle: boolean = true;

  constructor(private renderer2: Renderer2) {
  }

  ngOnInit(): void {
  }

  public switchMode(mode: string) {
    if (!this.toggle && mode === 'light') {
      this.toggle = true;
      this.renderer2.removeClass(document.body, 'dark-theme');
      this.renderer2.addClass(document.body, 'light-theme');
    } else if (this.toggle && mode === 'dark') {
      this.toggle = false;
      this.renderer2.removeClass(document.body, 'light-theme');
      this.renderer2.addClass(document.body, 'dark-theme');
    }
  }
}
