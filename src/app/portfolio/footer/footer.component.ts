import { Component } from '@angular/core';

@Component({
  selector: 'pf-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public year: number = (new Date()).getFullYear();;
}
