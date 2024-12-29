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
  md_rarity: 'Common' | 'Rare' | 'Super Rare' | 'Ultra Rare';
  has_effect: boolean;
};

export type SecretPackCard = Card & {
  flipped?: boolean;
  selected?: boolean;
};
