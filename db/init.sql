-- DROP TABLE IF EXISTS cards CASCADE;
-- DROP TABLE IF EXISTS card_set_cards CASCADE;
-- DROP TABLE IF EXISTS card_sets CASCADE;
-- DROP TABLE IF EXISTS secret_pack_cards CASCADE;
-- DROP TABLE IF EXISTS secret_packs CASCADE;
-- DROP TABLE IF EXISTS images CASCADE;
-- DROP TABLE IF EXISTS card_linkmarkers CASCADE;
-- DROP TABLE IF EXISTS linkmarkers CASCADE;
-- DROP TABLE IF EXISTS user_collections CASCADE;
-- DROP TABLE IF EXISTS collection_cards CASCADE;

CREATE TABLE IF NOT EXISTS linkmarkers (
  marker TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS card_sets (
  set_name TEXT PRIMARY KEY,
  set_code TEXT,
  num_cards INTEGER,
  tcg_date DATE,
  set_type TEXT
);

CREATE TABLE IF NOT EXISTS secret_packs (
  secret_pack_id SERIAL PRIMARY KEY,
  image_name TEXT,
  set_name TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS cards (
  card_id TEXT PRIMARY KEY,
  card_name TEXT NOT NULL,
  card_type TEXT NOT NULL,
  card_desc TEXT,
  atk INTEGER,
  def INTEGER,
  card_level INTEGER,
  race TEXT,
  attribute TEXT,
  scale INTEGER,
  linkval INTEGER,
  archetype TEXT,
  md_rarity TEXT,
  has_effect BOOLEAN
);

CREATE INDEX IF NOT EXISTS cards_card_name ON cards (card_name);
CREATE INDEX IF NOT EXISTS cards_card_desc ON cards (card_desc);

CREATE TABLE IF NOT EXISTS card_linkmarkers (
  card_id TEXT REFERENCES cards (card_id) ON UPDATE CASCADE,
  marker TEXT REFERENCES linkmarkers (marker) ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS card_linkmarkers_card_id ON card_linkmarkers (card_id);
CREATE INDEX IF NOT EXISTS card_linkmarkers_marker ON card_linkmarkers (marker);

CREATE TABLE IF NOT EXISTS secret_pack_cards (
  card_id TEXT REFERENCES cards (card_id) ON UPDATE CASCADE,
  secret_pack_id INTEGER REFERENCES secret_packs (secret_pack_id) ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS secret_pack_cards_card_id ON secret_pack_cards (card_id);
CREATE INDEX IF NOT EXISTS secret_pack_cards_secret_pack_id ON secret_pack_cards (secret_pack_id);

CREATE TABLE IF NOT EXISTS card_set_cards (
  card_id TEXT REFERENCES cards (card_id) ON UPDATE CASCADE,
  set_name TEXT REFERENCES card_sets (set_name) ON UPDATE CASCADE,
  set_code TEXT,
  set_rarity TEXT, 
  set_rarity_code TEXT,
  set_price NUMERIC(8,2)
);

CREATE INDEX IF NOT EXISTS card_set_cards_card_id ON card_set_cards (card_id);
CREATE INDEX IF NOT EXISTS card_set_cards_set_name ON card_set_cards (set_name);

CREATE TABLE IF NOT EXISTS images (
  image_id INTEGER PRIMARY KEY,
  card_id TEXT REFERENCES cards (card_id) ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS images_card_id ON images (card_id);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  google_id TEXT UNIQUE,
  twitter_id TEXT UNIQUE,
  twitch_id TEXT UNIQUE,
  username TEXT NOT NULL
);

-- compressed collection
CREATE TABLE IF NOT EXISTS collections (
  user_id INTEGER REFERENCES users (user_id) ON UPDATE CASCADE,
  collection_id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  num_cards INTEGER,
  collection_name TEXT,
  collection_data BYTEA
);

CREATE INDEX IF NOT EXISTS collections_user_id ON collections (user_id);

-- not compressed collection
CREATE TABLE IF NOT EXISTS collection_cards (
  collection_id INTEGER REFERENCES collections (collection_id) ON DELETE CASCADE,
  card_id TEXT REFERENCES cards (card_id) ON DELETE CASCADE,
  copies SMALLINT NOT NULL,
  CONSTRAINT copies_greaterthan_zero CHECK (copies > 0),
  PRIMARY KEY (collection_id, card_id)
);

CREATE INDEX IF NOT EXISTS collection_cards_collection_id ON collection_cards (collection_id);
CREATE INDEX IF NOT EXISTS collection_cards_card_id ON collection_cards (card_id);