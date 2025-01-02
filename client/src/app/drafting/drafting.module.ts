import { NgModule } from '@angular/core';

import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';

import { DraftingRoutingModule } from './drafting-routing.module';
import { SetlistPackComponent } from './setlist/setlist-pack/setlist-pack.component';
import { SetlistComponent } from './setlist/setlist.component';
import { DraftingOptionsComponent } from './setlist/drafting-options/drafting-options.component';
import { PackOpeningComponent } from './opening/pack-opening/pack-opening.component';
import { PackCardComponent } from './opening/pack-card/pack-card.component';
import { BulkOpenComponent } from './opening/bulk-open/bulk-open.component';
import { BulkCardComponent } from './opening/bulk-open/bulk-card/bulk-card.component';
import { SharedModule } from '../_shared/shared.module';
import { CardModalComponent } from '../_shared/card-modal/card-modal.component';

@NgModule({
  declarations: [
    SetlistComponent,
    SetlistPackComponent,
    DraftingOptionsComponent,
    PackOpeningComponent,
    PackCardComponent,
    BulkOpenComponent,
    BulkCardComponent,
  ],
  imports: [
    SharedModule,
    DraftingRoutingModule,
    CheckboxModule,
    DropdownModule,
  ],
})
export class DraftingModule {}
