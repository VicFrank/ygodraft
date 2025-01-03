import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretPacksComponent } from './secret-packs/secret-packs.component';
import { SecretPackComponent } from './secret-pack/secret-pack.component';
import { SecretPackOpeningComponent } from './secret-pack-opening/secret-pack-opening.component';

const routes: Routes = [
  { path: '', component: SecretPacksComponent },
  { path: 'opening', component: SecretPackOpeningComponent },
  { path: ':id', component: SecretPackComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDuelRoutingModule {}
