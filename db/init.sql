DROP TABLE IF EXISTS cards CASCADE;
DROP TABLE IF EXISTS card_set_cards CASCADE;
DROP TABLE IF EXISTS card_sets CASCADE;
DROP TABLE IF EXISTS images CASCADE;
DROP TABLE IF EXISTS card_linkmarkers CASCADE;
DROP TABLE IF EXISTS linkmarkers CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_collections CASCADE;
DROP TABLE IF EXISTS collection_cards CASCADE;

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
  archetype TEXT
);

CREATE TABLE IF NOT EXISTS card_linkmarkers (
  card_id TEXT REFERENCES cards (card_id) ON UPDATE CASCADE,
  marker TEXT REFERENCES linkmarkers (marker) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS card_set_cards (
  card_id TEXT REFERENCES cards (card_id) ON UPDATE CASCADE,
  set_name TEXT REFERENCES card_sets (set_name) ON UPDATE CASCADE,
  set_code TEXT,
  set_rarity TEXT, 
  set_rarity_code TEXT,
  set_price NUMERIC(8,2)
);

CREATE TABLE IF NOT EXISTS images (
  image_id INTEGER PRIMARY KEY,
  card_id TEXT REFERENCES cards (card_id) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  username TEXT NOT NULL
);

-- compressed collection
CREATE TABLE IF NOT EXISTS collections (
  user_id INTEGER REFERENCES users (user_id) ON UPDATE CASCADE,
  collection_id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  num_cards INTEGER,
  collection_data BYTEA
);

-- not compressed collection
CREATE TABLE IF NOT EXISTS collection_cards (
  collection_id INTEGER REFERENCES collections (collection_id) ON UPDATE CASCADE,
  card_id TEXT REFERENCES cards (card_id) ON UPDATE CASCADE,
  copies SMALLINT NOT NULL,
  CONSTRAINT copies_greaterthan_zero CHECK (copies > 0),
  PRIMARY KEY (collection_id, card_id)
);

