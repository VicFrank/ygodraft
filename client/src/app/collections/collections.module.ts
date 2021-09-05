import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionsRoutingModule } from './collections-routing.module';
import { SelectableCollectionComponent } from './collections/selectable-collection/selectable-collection.component';
import { CollectionComponent } from './collection/collection.component';
import { CollectionCardComponent } from './collection/collection-card/collection-card.component';
import { CollectionFiltersComponent } from './collection/collection-filters/collection-filters.component';

@NgModule({
  declarations: [CollectionsComponent, SelectableCollectionComponent, CollectionComponent, CollectionCardComponent, CollectionFiltersComponent],
  imports: [SharedModule, CollectionsRoutingModule],
})
export class CollectionsModule {}
