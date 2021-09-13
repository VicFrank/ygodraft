import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class DraftingOptionsComponent implements OnInit {
  @Input() canOpen!: boolean;
  @Output() onOpenPacks = new EventEmitter<DraftEvent>();

  draftOptions: DraftEvent = {
    numPacks: 24,
    openingMethod: 'Traditional',
  };
  numPacksOptions: SelectItem[];
  openingOptions: SelectItem[];

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

  ngOnInit(): void {
    const options = sessionStorage.getItem('drafting-options');
    if (options) {
      const parsedOptions = JSON.parse(options);
      if (parsedOptions.numPacks > 24) return;
      this.draftOptions = parsedOptions;
    }
  }

  openPacks() {
    this.onOpenPacks.emit(this.draftOptions);
  }

  optionsChanged() {
    sessionStorage.setItem(
      'drafting-options',
      JSON.stringify(this.draftOptions)
    );
  }
}
