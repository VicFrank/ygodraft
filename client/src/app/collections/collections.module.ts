import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionsRoutingModule } from './collections-routing.module';

@NgModule({
  declarations: [CollectionsComponent],
  imports: [SharedModule, CollectionsRoutingModule],
})
export class CollectionsModule {}
