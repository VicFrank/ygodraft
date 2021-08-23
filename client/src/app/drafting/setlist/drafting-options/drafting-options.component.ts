import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';

interface DraftEvent {
  numPacks: number;
  openingMethod: string;
}

@Component({
  selector: 'app-drafting-options',
  templateUrl: './drafting-options.component.html',
  styleUrls: ['./drafting-options.component.css'],
})
export class DraftingOptionsComponent {
  draftOptions: DraftEvent = {
    numPacks: 24,
    openingMethod: 'Traditional',
  };
  numPacksOptions: SelectItem[];
  openingOptions: SelectItem[];

  @Output() onOpenPacks = new EventEmitter<DraftEvent>();

  constructor() {
    this.numPacksOptions = [
      { label: '1', value: 1 },
      { label: '6', value: 6 },
      { label: '12', value: 12 },
      { label: '24', value: 24 },
    ];
    this.openingOptions = [
      { label: 'Traditional', value: 'Traditional' },
      { label: 'Bulk', value: 'Bulk' },
    ];
  }

  openPacks() {
    this.onOpenPacks.emit(this.draftOptions);
  }
}
