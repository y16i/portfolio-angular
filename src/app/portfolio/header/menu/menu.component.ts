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
}
