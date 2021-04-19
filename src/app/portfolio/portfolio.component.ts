import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pf-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  public show: boolean = false;
  private border = 700;

  constructor(private router: Router) {
  }

  @HostListener("window:scroll", []) onWindowScroll() {
    this.show = document.body.scrollTop > this.border || document.documentElement.scrollTop > this.border;
  }

  ngOnInit(): void {
  }

  public backToTop() {
    this.router.navigate(['/']);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }
}
