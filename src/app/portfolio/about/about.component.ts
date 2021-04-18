import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WordpressApiService } from 'src/app/shared/services/wordpress-api.service';

@Component({
  selector: 'pf-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  private ngUnSubscribe: Subject<any> = new Subject();
  public content;

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
    .subscribe(content => {
      this.content = content;
    })
  }
}
