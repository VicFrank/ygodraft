import { Component, OnInit } from '@angular/core';
import { CollectionCard } from 'src/app/models/CollectionCard.model';
import { PackCard } from 'src/app/models/drafting/PackCard.model';
import { PackOpeningService } from '../pack-opening.service';

@Component({
  selector: 'app-pack-opening',
  templateUrl: './pack-opening.component.html',
  styleUrls: ['./pack-opening.component.css'],
})
export class PackOpeningComponent implements OnInit {
  cardset: string = 'Legend of Blue Eyes White Dragon';
  numPacks: number = 24;

  currentPack: PackCard[] = [];
  openedCards: CollectionCard[] = [];

  constructor(private packOpener: PackOpeningService) {}

  ngOnInit(): void {
    this.nextPack();
  }

  nextPack() {
    this.packOpener.generatePacks(this.cardset, 1).subscribe((packs) => {
      this.currentPack = packs[0].map((card) => ({ ...card, flipped: false }));
      this.shuffleArray(this.currentPack);
    });
  }

  flipAll() {
    for (let card of this.currentPack) {
      card.flipped = true;
    }
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
