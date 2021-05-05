import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

declare const gtag;
@Component({
  selector: 'pf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';

  constructor(private router: Router) {
    router.events.pipe(filter(e => e instanceof NavigationEnd))
    .subscribe((e: NavigationEnd) => {
      gtag('config', environment.gTag.id);
    });
  }
}
