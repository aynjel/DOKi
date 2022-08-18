import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private isDesktop = new BehaviorSubject<boolean>(false);
  private isPortrait = new BehaviorSubject<boolean>(false);
  constructor() {}

  onResize(size) {
    if (size <= 666) {
      this.isDesktop.next(false);
    } else {
      this.isDesktop.next(true);
    }
  }
  onPortrait(size) {
    if (size == 90 || size == -90) {
      this.isPortrait.next(false);
    } else {
      this.isPortrait.next(true);
    }
  }
  isDesktopView(): Observable<boolean> {
    return this.isDesktop.asObservable().pipe(distinctUntilChanged());
  }
  isPortraitView(): Observable<boolean> {
    return this.isPortrait.asObservable().pipe(distinctUntilChanged());
  }
}
