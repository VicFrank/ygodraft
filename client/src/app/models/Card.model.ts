export type MasterDuelRarity = 'Common' | 'Rare' | 'Super Rare' | 'Ultra Rare';

export type Card = {
  card_id: string;
  card_name: string;
  card_type: string;
  card_desc: string;
  atk: number;
  def: number;
  card_level: number;
  race: string;
  attribute: string;
  scale: number;
  linkval: number;
  archetype: string;
  md_rarity: MasterDuelRarity;
  has_effect: boolean;
};

export type SecretPackCard = Card & {
  flipped?: boolean;
  selected?: boolean;
};

export type CollectionCard = Card & {
  md_rarity: string;
  copies: number;
  copies_in_use: number;
};
