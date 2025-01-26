import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { CardModalComponent } from './card-modal/card-modal.component';
import { FormatDescriptionPipe } from './pipes/description-pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    ToastModule,
    ProgressSpinnerModule,
    InputNumberModule,
    InputTextModule,
    DialogModule,
    SplitButtonModule,
  ],
  declarations: [
    PageNotFoundComponent,
    FormatDescriptionPipe,
    CardModalComponent,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ProgressSpinnerModule,
    InputNumberModule,
    InputTextModule,
    DialogModule,
    SplitButtonModule,
    SkeletonModule,
    CardModalComponent,
  ],
})
export class SharedModule {}
