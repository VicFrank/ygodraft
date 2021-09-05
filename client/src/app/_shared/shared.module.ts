import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [
    PageNotFoundComponent
  ],
  exports: [ButtonModule, CommonModule, FormsModule],
})
export class SharedModule {}
