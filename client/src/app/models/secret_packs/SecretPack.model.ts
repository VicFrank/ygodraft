import { Card } from '../Card.model';

export interface SecretPack {
  secret_pack_id: number;
  image_name: string;
  set_name: string;
  cards: Card[];
}
