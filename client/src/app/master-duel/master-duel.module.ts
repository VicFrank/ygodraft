import { NgModule } from '@angular/core';

import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { SharedModule } from '../_shared/shared.module';

import { MasterDuelRoutingModule } from './master-duel-routing.module';
import { SecretPackComponent } from './secret-pack/secret-pack.component';
import { MasterDuelCardComponent } from './master-duel-card/master-duel-card.component';
import { SecretPacksComponent } from './secret-packs/secret-packs.component';
import { SecretPackOpeningComponent } from './secret-pack-opening/secret-pack-opening.component';
import { SecretPackCardComponent } from './secret-pack-card/secret-pack-card.component';

@NgModule({
  declarations: [
    SecretPackComponent,
    SecretPacksComponent,
    MasterDuelCardComponent,
    SecretPackOpeningComponent,
    SecretPackCardComponent,
  ],
  imports: [
    MasterDuelRoutingModule,
    SharedModule,
    CheckboxModule,
    DropdownModule,
    ChartModule,
  ],
})
export class MasterDuelModule {}
