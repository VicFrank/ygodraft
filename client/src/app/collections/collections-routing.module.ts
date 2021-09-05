import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { CollectionsComponent } from './collections/collections.component';

const routes: Routes = [
  {
    path: '',
    component: CollectionsComponent,
  },
  {
    path: ':id',
    component: CollectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsRoutingModule {}
