import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputNumberModule } from 'primeng/inputnumber';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    ToastModule,
    ProgressSpinnerModule,
    InputNumberModule,
  ],
  declarations: [PageNotFoundComponent],
  exports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ProgressSpinnerModule,
    InputNumberModule,
  ],
})
export class SharedModule {}
