import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [CommonModule, ButtonModule, ToastModule, ProgressSpinnerModule],
  declarations: [PageNotFoundComponent],
  exports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    ToastModule,
    ProgressSpinnerModule,
  ],
})
export class SharedModule {}
