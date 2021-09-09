import { CollectionCard } from './CollectionCard.model';

export interface Collection {
  collection_id: number;
  created_at: Date;
  updated_at: Date;
  num_cards: number;
  collection_cards: CollectionCard[];
}
