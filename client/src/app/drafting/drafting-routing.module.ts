import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetlistComponent } from './setlist/setlist.component';
import { PackOpeningComponent } from './opening/pack-opening/pack-opening.component';

const routes: Routes = [
  { path: '', component: SetlistComponent },
  { path: 'opening', component: PackOpeningComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DraftingRoutingModule {}
