import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionCard } from 'src/app/models/CollectionCard.model';
import { PackCard } from 'src/app/models/drafting/PackCard.model';
import { DraftingService } from '../../drafting.service';
import { PackOpeningService } from '../pack-opening.service';

@Component({
  selector: 'app-pack-opening',
  templateUrl: './pack-opening.component.html',
  styleUrls: ['./pack-opening.component.css'],
})
export class PackOpeningComponent implements OnInit {
  cardset: string = 'Legend of Blue Eyes White Dragon';
  packsOpened: number = 0;
  packsToOpen: number = 0;
  allFlipped: boolean = false;

  currentPack: PackCard[] = [];
  openedCards: CollectionCard[] = [];

  constructor(
    private packOpener: PackOpeningService,
    private router: Router,
    private draftingService: DraftingService
  ) {}

  ngOnInit(): void {
    this.packsToOpen = this.draftingService.packsToOpen.length;
    if (this.packsToOpen === 0) {
      // We don't have any packs to open, redirect back to drafting
      this.router.navigate(['drafting']);
    }
    this.nextPack();
  }

  nextPack() {
    if (this.draftingService.packsToOpen.length === 0) return;

    this.cardset = this.draftingService.packsToOpen.shift()!;
    this.packsOpened += 1;

    this.packOpener.generatePacks(this.cardset, 1).subscribe((packs) => {
      this.currentPack = packs[0].map((card) => ({ ...card, flipped: false }));
      this.shuffleArray(this.currentPack);
      this.allFlipped = false;
    });
  }

  onCardFlipped() {
    this.allFlipped = !this.currentPack.some((card) => !card.flipped);
  }

  flipAll() {
    for (let card of this.currentPack) {
      card.flipped = true;
    }
    this.allFlipped = true;
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
