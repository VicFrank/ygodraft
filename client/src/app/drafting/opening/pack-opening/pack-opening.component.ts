import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackCard } from 'src/app/models/drafting/PackCard.model';
import { DraftingService } from '../../drafting.service';

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

  constructor(
    private router: Router,
    private draftingService: DraftingService
  ) {}

  ngOnInit(): void {
    this.packsToOpen = this.draftingService.packsToOpen.length;
    this.draftingService.openedPacks = [];

    if (this.packsToOpen === 0) {
      // We don't have any packs to open, redirect back to drafting
      this.router.navigate(['drafting']);
    }
    this.nextPack();
  }

  async nextPack() {
    if (this.draftingService.packsToOpen.length === 0) return;

    this.cardset = this.draftingService.packsToOpen.shift()!;
    this.packsOpened += 1;

    this.currentPack = await this.draftingService.openSinglePack(this.cardset);
    this.allFlipped = false;
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
}
