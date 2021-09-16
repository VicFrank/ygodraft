export interface CollectionCard {
  card_id: string;
  card_name: string;
  card_type: string;
  card_desc: string;
  atk: number | null;
  def: number | null;
  card_level: number | null;
  race: string;
  attribute: string | null;
  scale: number | null;
  linkval: number | null;
  archetype: string | null;
  copies: number;
  copies_in_use: number;
}
