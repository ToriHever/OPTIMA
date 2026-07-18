import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderThemeService {
  private readonly _dark = signal(false);
  readonly dark = this._dark.asReadonly();

  setDark(value: boolean): void {
    this._dark.set(value);
  }
}
