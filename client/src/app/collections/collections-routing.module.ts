import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { CollectionsComponent } from './collections/collections.component';
import { AuthGuardService } from '../_shared/auth-guard.service';
import { CollectionGuard } from './guards/collection.guard';

const routes: Routes = [
  {
    path: '',
    component: CollectionsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'new',
    component: CollectionComponent,
    canDeactivate: [CollectionGuard],
  },
  {
    path: 'collection/:id',
    component: CollectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService],
})
export class CollectionsRoutingModule {}
