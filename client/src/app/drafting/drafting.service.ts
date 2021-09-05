import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { PackCard } from '../models/drafting/PackCard.model';
import { PackOpeningService } from './opening/pack-opening.service';

@Injectable({
  providedIn: 'root',
})
export class DraftingService {
  packsToOpen: string[] = [];
  setsToOpen: string[] = [];
  openedPacks: PackCard[][] = [];
  packsPerSet: number = 1;

  constructor(private packOpener: PackOpeningService) {}

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  resetDraft() {
    this.packsToOpen = [];
    this.setsToOpen = [];
    this.openedPacks = [];
  }

  async openSinglePack(set: string) {
    const packs = await this.packOpener.generatePacks(set, 1).toPromise();
    let pack = packs[0];
    this.openedPacks.push(pack);
    pack = pack.map((card) => ({ ...card, flipped: false }));
    this.shuffleArray(pack);

    return pack;
  }

  async bulkOpenPacks(set: string) {
    const packs = await this.packOpener
      .generatePacks(set, this.packsPerSet)
      .toPromise();
    this.openedPacks = this.openedPacks.concat(packs);
    return packs;
  }

  async bulkOpenSets(sets: string[]) {
    const packs = await this.packOpener
      .openSets(sets, this.packsPerSet)
      .toPromise();
    this.openedPacks = this.openedPacks.concat(packs);
    return packs;
  }
}
