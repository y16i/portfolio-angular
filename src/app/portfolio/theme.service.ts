import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from './theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeObservable = new BehaviorSubject<Theme>(Theme.light);
  public theme$ = this.themeObservable.asObservable();

  constructor() { }

  public changeTo(theme: Theme) {
    this.themeObservable.next(theme);
  }
}
