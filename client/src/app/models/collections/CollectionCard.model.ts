import { Card } from '../Card.model';

export interface CollectionCard {
  card: Card;
  copies: number;
  copies_in_use: number;
}
