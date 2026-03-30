import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private pendingScrollId: string | null = null;
 
  setPendingScroll(sectionId: string): void {
    this.pendingScrollId = sectionId;
  }
 
  getPendingScroll(): string | null {
    return this.pendingScrollId;
  }
 
  clearPendingScroll(): void {
    this.pendingScrollId = null;
  }
}
 