import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pf-code-link',
  templateUrl: './code-link.component.html',
  styleUrls: ['./code-link.component.scss']
})
export class CodeLinkComponent implements OnInit {
  @Input() url: string;

  constructor() { }

  ngOnInit(): void {
  }

}
