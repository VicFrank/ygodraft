import { Injectable } from '@angular/core';
import { Card } from '../models/Card.model';
import { DraftOptions } from '../models/drafting/DraftOptions.model';
import { PackCard } from '../models/drafting/PackCard.model';
import { CardsService } from '../_shared/cards.service';
import { CollectionsService } from '../_shared/collections.service';
import { PackOpeningService } from './opening/pack-opening.service';

@Injectable({
  providedIn: 'root',
})
export class DraftingService {
  packsToOpen: string[] = [];
  setsToOpen: string[] = [];
  openedCards: PackCard[] = [];
  draftedCards: PackCard[] = [];
  packsPerSet: number = 1;
  draftOptions?: DraftOptions;

  constructor(
    private packOpener: PackOpeningService,
    private cardService: CardsService,
    private collectionsService: CollectionsService
  ) {}

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  resetDraft(draftOptions: DraftOptions) {
    this.packsToOpen = [];
    this.setsToOpen = [];
    this.openedCards = [];
    this.draftedCards = [];
    this.draftOptions = draftOptions;
  }

  async createCollection() {
    // Decide whether to add all cards, or just drafted cards
    let cardsToAdd = this.openedCards;
    if (this.draftOptions?.drafting) {
      cardsToAdd = this.draftedCards;
    }
    // Convert opened cards to frequencies
    let cardMap: any = {};
    for (const card of cardsToAdd) {
      const { card_name, card_id } = card;
      if (cardMap[card_name]) {
        cardMap[card_name].copies += 1;
      } else {
        cardMap[card_name] = { card_id, copies: 1 };
      }
    }
    const cardIDs = Object.values(cardMap).map((card: any) => card.card_id);
    // Get the card data for each card id from the backend
    let cards: Card[];
    try {
      cards = await this.cardService.bulkGetCards(cardIDs).toPromise();
    } catch (error) {
      throw error;
    }
    const collection_cards = cards.map((card) => ({
      ...card,
      copies: cardMap[card.card_name].copies,
      copies_in_use: 0,
    }));
    this.collectionsService.createNewCollection(collection_cards, false);
  }

  async openSinglePack(set: string) {
    try {
      const packs = await this.packOpener.generatePacks(set, 1).toPromise();
      let pack = packs[0];
      this.openedCards = this.openedCards.concat(pack);
      pack = pack.map((card) => ({ ...card, flipped: false, selected: false }));
      this.shuffleArray(pack);

      return pack;
    } catch (error) {
      throw error;
    }
  }

  async bulkOpenPacks(set: string) {
    const packs = await this.packOpener
      .generatePacks(set, this.packsPerSet)
      .toPromise();
    const newcards = packs.reduce((flat, next) => flat.concat(next), []);
    this.openedCards = this.openedCards.concat(newcards);
    return packs;
  }

  async openAllSets() {
    const packs = await this.packOpener
      .openSets(this.setsToOpen, this.packsPerSet)
      .toPromise();
    const newcards = packs.reduce((flat, next) => flat.concat(next), []);
    this.openedCards = this.openedCards.concat(newcards);
    this.setsToOpen = [];
    return packs;
  }

  addCardsToDraft(cards: PackCard[]) {
    this.draftedCards = this.draftedCards.concat(cards);
  }
}
