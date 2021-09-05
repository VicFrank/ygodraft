import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cardset } from 'src/app/models/Cardset.model';
import { DraftOptions } from 'src/app/models/drafting/DraftOptions.model';
import { CardsetService } from 'src/app/_shared/cardset.service';
import { DraftingService } from '../drafting.service';

@Component({
  selector: 'app-setlist',
  templateUrl: './setlist.component.html',
  styleUrls: ['./setlist.component.css'],
})
export class SetlistComponent implements OnInit {
  cardsets: Cardset[] = [];
  selectedSets: string[] = [];

  constructor(
    private cardsetService: CardsetService,
    private router: Router,
    private draftingService: DraftingService
  ) {}

  ngOnInit(): void {
    this.showBoosterSets();
  }

  showCardsets() {
    this.cardsetService
      .getAllCardsets()
      .subscribe((cardsets) => (this.cardsets = cardsets));
  }

  showBoosterSets() {
    this.cardsetService
      .getAllCardsetsByType('Booster')
      .subscribe((cardsets) => (this.cardsets = cardsets));
  }

  openPacks(event: DraftOptions) {
    this.draftingService.resetDraft();

    if (event.openingMethod === 'Traditional') {
      for (const set of this.selectedSets) {
        for (let i = 0; i < event.numPacks; i++) {
          this.draftingService.packsToOpen.push(set);
        }
      }
      this.router.navigate(['drafting/opening']);
    } else if (event.openingMethod === 'Bulk') {
      this.draftingService.packsPerSet = event.numPacks;
      this.draftingService.setsToOpen = this.selectedSets;
      this.router.navigate(['drafting/bulk-opening']);
    }
  }
}
