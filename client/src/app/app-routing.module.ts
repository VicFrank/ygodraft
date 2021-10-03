import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './_shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'collections',
    loadChildren: () =>
      import('./collections/collections.module').then(
        (m) => m.CollectionsModule
      ),
  },
  {
    path: 'drafting',
    loadChildren: () =>
      import('./drafting/drafting.module').then((m) => m.DraftingModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
