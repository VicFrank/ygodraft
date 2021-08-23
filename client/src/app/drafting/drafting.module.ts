import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { DraftingRoutingModule } from './drafting-routing.module';
import { DraftingComponent } from './drafting.component';
import { SetlistPackComponent } from './setlist/setlist-pack/setlist-pack.component';
import { SetlistComponent } from './setlist/setlist.component';
import { DraftingOptionsComponent } from './setlist/drafting-options/drafting-options.component';
import { PackOpeningComponent } from './opening/pack-opening/pack-opening.component';
import { PackCardComponent } from './opening/pack-card/pack-card.component';

@NgModule({
  declarations: [
    DraftingComponent,
    SetlistComponent,
    SetlistPackComponent,
    DraftingOptionsComponent,
    PackOpeningComponent,
    PackCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DraftingRoutingModule,
    CheckboxModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
  ],
})
export class DraftingModule {}
