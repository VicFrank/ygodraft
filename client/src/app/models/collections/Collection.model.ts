import { CollectionCard } from '../Card.model';

export type Collection = {
  collection_id: number;
  created_at: Date;
  updated_at: Date;
  num_cards: number;
  collection_cards: CollectionCard[];
  collection_name: string;
  is_master_duel: boolean;
};
