import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetlistComponent } from './setlist/setlist.component';
import { PackOpeningComponent } from './opening/pack-opening/pack-opening.component';
import { BulkOpenComponent } from './opening/bulk-open/bulk-open.component';

const routes: Routes = [
  { path: '', component: SetlistComponent },
  { path: 'opening', component: PackOpeningComponent },
  { path: 'bulk-opening', component: BulkOpenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DraftingRoutingModule {}
