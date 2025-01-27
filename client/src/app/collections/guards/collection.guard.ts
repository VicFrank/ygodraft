import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CollectionComponent } from '../collection/collection.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollectionGuard implements CanDeactivate<CollectionComponent> {
  canDeactivate(component: CollectionComponent): Observable<boolean> | boolean {
    if (component.isNew && !component.hasCreatedCollection) {
      return confirm(
        `You haven't saved your changes. Are you sure you want to leave? This collection will be lost.`
      );
    }
    return true;
  }
}
