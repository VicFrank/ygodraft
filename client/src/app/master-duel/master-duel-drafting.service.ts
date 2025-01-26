import { Injectable } from '@angular/core';
import { Card, SecretPackCard } from '../models/Card.model';
import { SecretPacksService } from '../_shared/secret-packs.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionsService } from '../_shared/collections.service';

@Injectable({
  providedIn: 'root',
})
export class MasterDuelDraftingService {
  public openedCards: SecretPackCard[] = [];
  public packsToOpen: SecretPackCard[][] = [];

  private loadingPacks$ = new BehaviorSubject<boolean>(false);

  constructor(
    private SecretPackService: SecretPacksService,
    private collectionsService: CollectionsService
  ) {}

  resetDraft() {
    this.openedCards = [];
    this.packsToOpen = [];
  }

  async generatePacks(numPacks: number, secretPackId?: number) {
    this.loadingPacks$.next(true);

    const packs = await this.SecretPackService.generatePacks(
      numPacks,
      secretPackId
    );

    for (const pack of packs) {
      for (const card of pack) {
        card.flipped = false;
      }
    }

    this.loadingPacks$.next(false);
    this.packsToOpen = packs;
    return packs;
  }

  openSinglePack(): Card[] {
    const pack = this.packsToOpen.pop();
    if (pack) {
      this.openedCards.push(...pack);
    } else {
      throw new Error('No packs to open');
    }
    return pack;
  }

  openAllPacks() {
    while (this.packsToOpen.length > 0) {
      this.openSinglePack();
    }
  }

  private getCollectionCards() {
    const cardsToAdd = this.openedCards;
    const cardMap: any = {};

    for (const card of cardsToAdd) {
      const { card_name, card_id } = card;
      if (cardMap[card_name]) {
        cardMap[card_name].copies += 1;
      } else {
        cardMap[card_name] = { card_id, copies: 1 };
      }
    }

    const collectionCards = cardsToAdd.map((card) => ({
      ...card,
      copies: cardMap[card.card_name].copies,
      copies_in_use: 0,
    }));

    // remove duplicates
    return collectionCards.filter(
      (card, index, self) =>
        index === self.findIndex((t) => t.card_name === card.card_name)
    );
  }

  createCollection() {
    const collectionCards = this.getCollectionCards();

    this.collectionsService.createNewCollection(collectionCards, true);
  }

  addToCollection(collectionId: number) {
    this.collectionsService.addCardsToCollection(
      this.getCollectionCards(),
      true,
      collectionId
    );
  }

  getLoadingState(): Observable<boolean> {
    return this.loadingPacks$.asObservable();
  }
}
