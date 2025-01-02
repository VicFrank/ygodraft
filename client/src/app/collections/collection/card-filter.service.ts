import { Injectable } from '@angular/core';
import { Card, CollectionCard } from 'src/app/models/Card.model';
import { CollectionFilters } from 'src/app/models/collections/CollectionFilters.model';
import { CollectionSortType } from 'src/app/models/collections/CollectionSortType.model';

@Injectable({
  providedIn: 'root',
})
export class CardFilterService {
  constructor() {}

  filterCollection(
    cards: CollectionCard[],
    filters: CollectionFilters
  ): CollectionCard[] {
    const searchText = filters.searchText?.toLowerCase();
    return cards.filter((card) => {
      if (searchText) {
        const { card_name, card_desc } = card;
        if (
          !(
            card_name.toLowerCase().includes(searchText) ||
            card_desc.toLowerCase().includes(searchText)
          )
        ) {
          return false;
        }
      }
      if (filters.levels.length > 0) {
        if (card.card_level == null) return false;
        else if (!filters.levels.includes(card.card_level)) {
          return false;
        }
      }
      if (filters.race) {
        if (card.race !== filters.race) return false;
      }
      if (filters.attribute) {
        if (card.attribute !== filters.attribute) return false;
      }
      if (filters.type) {
        if (!card.card_type.includes(filters.type)) return false;
      }
      if (filters.archetype) {
        if (card.archetype !== filters.archetype) return false;
      }
      if (filters.mdRarity.length > 0) {
        if (!filters.mdRarity.includes(card.md_rarity)) return false;
      }
      return true;
    });
  }

  defaultCompare(card1: CollectionCard, card2: CollectionCard) {
    if (card1.card_type !== card2.card_type)
      return card1.card_type.localeCompare(card2.card_type);
    return card1.card_name.localeCompare(card2.card_name);
  }

  sortCollection(cards: CollectionCard[], field: CollectionSortType) {
    switch (field) {
      case 'type':
        cards.sort((card1, card2) => {
          if (card1.card_type === card2.card_type)
            return card1.card_name.localeCompare(card2.card_name);
          return card1.card_type.localeCompare(card2.card_type);
        });
        break;
      case 'name':
        cards.sort((card1, card2) => {
          return card1.card_name.localeCompare(card2.card_name);
        });
        break;
      case 'attack':
        cards.sort((card1, card2) => {
          if (card1.atk === card2.atk) return this.defaultCompare(card1, card2);
          if (card1.atk != null && card2.atk == null) return -1;
          if (card1.atk && card2.atk) return card2.atk - card1.atk;
          else return 0;
        });
        break;
      case 'defense':
        cards.sort((card1, card2) => {
          if (card1.def === card2.def) return this.defaultCompare(card1, card2);
          if (card1.def != null && card2.def == null) return -1;
          if (card1.def && card2.def) return card2.def - card1.def;
          else return 0;
        });
        break;
      case 'level':
        cards.sort((card1, card2) => {
          if (card1.card_level === card2.card_level)
            return this.defaultCompare(card1, card2);
          if (card1.card_level != null && card2.card_level == null) return -1;
          if (card1.card_level == null && card2.card_level != null) return 1;
          if (card1.card_level && card2.card_level)
            return card2.card_level - card1.card_level;
          else return 0;
        });
        break;
      case 'attribute':
        cards.sort((card1, card2) => {
          if (card1.attribute === card2.attribute)
            return this.defaultCompare(card1, card2);
          if (card1.attribute != null && card2.attribute == null) return -1;
          if (card1.attribute == null && card2.attribute != null) return 1;
          if (card1.attribute && card2.attribute)
            return card1.attribute.localeCompare(card2.attribute);
          else return 0;
        });
        break;
      case 'monster_type':
        cards.sort((card1, card2) => {
          if (card1.race === card2.race)
            return this.defaultCompare(card1, card2);
          return card1.race.localeCompare(card2.race);
        });
        break;
      case 'copies':
        cards.sort((card1, card2) => {
          if (card1.copies === card2.copies)
            return this.defaultCompare(card1, card2);
          return card2.copies - card1.copies;
        });
        break;
      case 'md_rarity':
        const rarityOrder = ['Ultra Rare', 'Super Rare', 'Rare', 'Common'];
        cards.sort((card1, card2) => {
          if (card1.md_rarity === card2.md_rarity)
            return this.defaultCompare(card1, card2);
          return (
            rarityOrder.indexOf(card1.md_rarity) -
            rarityOrder.indexOf(card2.md_rarity)
          );
        });
        break;
    }
  }

  filterCards(cards: Card[], filters: CollectionFilters): Card[] {
    return cards;
  }
}
