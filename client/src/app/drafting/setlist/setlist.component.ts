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
  draftOptions: DraftOptions = {
    numPacks: 24,
    draftMode: 'Traditional',
    openingMethod: 'Individual',
    drafting: false,
  };

  constructor(
    private cardsetService: CardsetService,
    private router: Router,
    private draftingService: DraftingService
  ) {}

  ngOnInit(): void {
    this.showBoosterSets();
  }

  showBoosterSets(): void {
    this.cardsetService
      .getAllCardsetsByType('booster')
      .subscribe((cardsets) => {
        this.cardsets = cardsets;
        if (this.draftOptions.draftMode === 'Chaos Draft') this.selectAllSets();
      });
  }

  selectAllSets(): void {
    this.selectedSets = this.cardsets.map((set) => set.set_name);
  }

  clearSelectedSets(): void {
    this.selectedSets = [];
  }

  openPacks(): void {
    this.draftingService.resetDraft(this.draftOptions);

    if (this.draftOptions.openingMethod === 'Individual') {
      for (const set of this.selectedSets) {
        for (let i = 0; i < this.draftOptions.numPacks; i++) {
          this.draftingService.packsToOpen.push(set);
        }
      }
      this.router.navigate(['drafting/opening']);
    } else if (this.draftOptions.openingMethod === 'Bulk') {
      this.draftingService.packsPerSet = this.draftOptions.numPacks;
      this.draftingService.setsToOpen = this.selectedSets;
      this.router.navigate(['drafting/bulk-opening']);
    }
  }
}
