import { Injectable } from '@angular/core';
import { Card } from '../models/Card.model';
import { CollectionCard } from '../models/collections/CollectionCard.model';
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
  packsPerSet: number = 1;

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

  resetDraft() {
    this.packsToOpen = [];
    this.setsToOpen = [];
    this.openedCards = [];
  }

  async createCollection() {
    // Convert opened cards to frequencies
    let cardMap: any = {};
    for (const card of this.openedCards) {
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
    const num_cards = this.openedCards.length;
    this.collectionsService.createNewCollectionWeb(collection_cards, num_cards);
  }

  async openSinglePack(set: string) {
    const packs = await this.packOpener.generatePacks(set, 1).toPromise();
    let pack = packs[0];
    this.openedCards = this.openedCards.concat(pack);
    pack = pack.map((card) => ({ ...card, flipped: false }));
    this.shuffleArray(pack);

    return pack;
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
}
