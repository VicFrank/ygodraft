import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DraftOptions } from 'src/app/models/drafting/DraftOptions.model';

@Component({
  selector: 'app-drafting-options',
  templateUrl: './drafting-options.component.html',
  styleUrls: ['./drafting-options.component.css'],
})
export class DraftingOptionsComponent implements OnInit {
  @Input() canOpen!: boolean;
  @Output() onOpenPacks = new EventEmitter<DraftOptions>();
  @Output() onSelectAll = new EventEmitter();
  @Output() onDeselectAll = new EventEmitter();
  @Input() draftOptions!: DraftOptions;
  @Output() draftOptionsChange = new EventEmitter<DraftOptions>();

  numPacksOptions: SelectItem[];
  openingOptions: SelectItem[];
  draftModeOptions: SelectItem[];

  constructor() {
    this.numPacksOptions = [
      { label: '1', value: 1 },
      { label: '6', value: 6 },
      { label: '12', value: 12 },
      { label: '24', value: 24 },
    ];
    this.draftModeOptions = [
      { label: 'Traditional', value: 'Traditional' },
      { label: 'Draft', value: 'Draft' },
      { label: 'Chaos Draft', value: 'Chaos Draft' },
      { label: 'Sealed', value: 'Sealed', disabled: true },
    ];
    this.openingOptions = [
      { label: 'Individual', value: 'Individual' },
      { label: 'Bulk', value: 'Bulk' },
    ];
  }

  ngOnInit(): void {
    const options = sessionStorage.getItem('drafting-options');
    if (options) {
      const parsedOptions = JSON.parse(options);
      if (parsedOptions.numPacks > 24) return;
      this.draftOptions = parsedOptions;
      this.draftModeChanged();
    }
  }

  openPacks() {
    this.onOpenPacks.emit(this.draftOptions);
  }

  draftModeChanged() {
    if (this.draftOptions.draftMode === 'Chaos Draft') {
      this.onSelectAll.emit();
      this.draftOptions.numPacks = 1;
    } else {
      this.onDeselectAll.emit();
    }
    this.draftOptions.drafting = this.draftOptions.draftMode.includes('Draft');

    if (this.draftOptions.drafting) {
      this.draftOptions.openingMethod = 'Individual';
    }

    this.optionsChanged();
  }

  optionsChanged() {
    sessionStorage.setItem(
      'drafting-options',
      JSON.stringify(this.draftOptions)
    );
    this.draftOptionsChange.emit(this.draftOptions);
  }
}
