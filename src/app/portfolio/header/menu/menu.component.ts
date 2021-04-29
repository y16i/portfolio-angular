import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pf-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public show: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  // mat-menu doesn't work for fragment scroll and use this.
  public open() {

  }
}
