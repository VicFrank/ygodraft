import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';

import { CollectionsComponent } from './collections/collections.component';
import { CollectionsRoutingModule } from './collections-routing.module';
import { SelectableCollectionComponent } from './collections/selectable-collection/selectable-collection.component';
import { CollectionComponent } from './collection/collection.component';
import { CollectionCardComponent } from './collection/collection-card/collection-card.component';
import { CollectionFiltersComponent } from './collection/collection-filters/collection-filters.component';

@NgModule({
  declarations: [
    CollectionsComponent,
    SelectableCollectionComponent,
    CollectionComponent,
    CollectionCardComponent,
    CollectionFiltersComponent,
  ],
  imports: [
    SharedModule,
    CollectionsRoutingModule,
    AutoCompleteModule,
    InputTextModule,
    MultiSelectModule,
    DropdownModule,
  ],
})
export class CollectionsModule {}
