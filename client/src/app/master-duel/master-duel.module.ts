import { NgModule } from '@angular/core';

import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ChartModule } from 'primeng/chart';
import { SharedModule } from '../_shared/shared.module';

import { MasterDuelRoutingModule } from './master-duel-routing.module';
import { SecretPackComponent } from './secret-pack/secret-pack.component';
import { MasterDuelCardComponent } from './master-duel-card/master-duel-card.component';
import { SecretPacksComponent } from './secret-packs/secret-packs.component';
import { FormatDescriptionPipe } from '../_shared/pipes/description-pipe';

@NgModule({
  declarations: [
    SecretPackComponent,
    SecretPacksComponent,
    MasterDuelCardComponent,
    FormatDescriptionPipe,
  ],
  imports: [
    MasterDuelRoutingModule,
    SharedModule,
    CheckboxModule,
    DropdownModule,
    DialogModule,
    ChartModule,
  ],
})
export class MasterDuelModule {}
