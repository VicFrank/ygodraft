import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cardset } from 'src/app/models/Cardset.model';
import { DraftOptions } from 'src/app/models/drafting/DraftOptions.model';
import { CardsetService } from 'src/app/_shared/cardset.service';

@Component({
  selector: 'app-setlist',
  templateUrl: './setlist.component.html',
  styleUrls: ['./setlist.component.css'],
})
export class SetlistComponent implements OnInit {
  cardsets: Cardset[] = [];
  selectedSets: string[] = [];

  constructor(private cardsetService: CardsetService, private router: Router) {}

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

  openPacks(event: any) {
    const draftOptions: DraftOptions = {
      ...event,
      sets: this.selectedSets,
    };
    this.router.navigate(['drafting/opening']);
  }
}
