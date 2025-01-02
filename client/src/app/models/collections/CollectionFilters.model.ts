import { MasterDuelRarity } from '../Card.model';

export type CollectionFilters = {
  searchText?: string;
  levels: number[];
  race?: string;
  attribute?: string;
  type?: string;
  archetype?: string;
  mdRarity: MasterDuelRarity[];
};
