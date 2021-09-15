import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CollectionFilters } from 'src/app/models/collections/CollectionFilters.model';
import { CardsService } from 'src/app/_shared/cards.service';
@Component({
  selector: 'app-collection-filters',
  templateUrl: './collection-filters.component.html',
  styleUrls: ['./collection-filters.component.css'],
})
export class CollectionFiltersComponent {
  @Input() filters!: CollectionFilters;
  @Output() filtersChange = new EventEmitter<CollectionFilters>();
  @Input() sort!: string;
  @Output() sortChange = new EventEmitter<string>();

  archetypes: string[] = [];
  filteredArchetypes: string[] = [];

  levelOptions: SelectItem[];
  sortOptions: SelectItem[];
  cardTypeOptions: SelectItem[];
  raceTypeOptions: SelectItem[];
  attributeOptions: SelectItem[];

  searchStringChanged: Subject<string> = new Subject<string>();

  constructor(private cardsService: CardsService) {
    this.levelOptions = [
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 },
      { label: '6', value: 6 },
      { label: '7', value: 7 },
      { label: '8', value: 8 },
      { label: '9', value: 9 },
      { label: '10', value: 10 },
      { label: '11', value: 11 },
      { label: '12', value: 12 },
    ];
    this.sortOptions = [
      { label: 'Card Type', value: 'type' },
      { label: 'Name', value: 'name' },
      { label: 'Attack', value: 'attack' },
      { label: 'Defense', value: 'defense' },
      { label: 'Level', value: 'level' },
      { label: 'Forbidden', value: 'forbidden' },
      { label: 'Monster Attribute', value: 'attribute' },
      { label: 'Monster Type', value: 'type' },
      { label: 'New!', value: 'new' },
      { label: 'Copies', value: 'copies' },
    ];
    this.cardTypeOptions = [
      { label: 'Spell', value: 'Spell' },
      { label: 'Trap', value: 'Trap' },
      { label: 'Normal', value: 'Normal' },
      { label: 'Effect', value: 'Effect' },
      { label: 'Ritual', value: 'Ritual' },
      { label: 'Fusion', value: 'Fusion' },
      { label: 'Synchro', value: 'Synchro' },
      { label: 'XYZ', value: 'XYZ' },
      { label: 'Pendulum', value: 'Pendulum' },
      { label: 'Link', value: 'Link' },
      { label: 'Flip', value: 'Flip' },
      { label: 'Spirit', value: 'Spirit' },
      { label: 'Toon', value: 'Toon' },
      { label: 'Union', value: 'Union' },
      { label: 'Gemini', value: 'Gemini' },
      { label: 'Tuner', value: 'Tuner' },
    ];
    // prettier-ignore
    this.raceTypeOptions = [
      { label: 'Reptile', value: 'Reptile', icon: 'reptile_small.png' },
      { label: 'Sea Serpent', value: 'Sea Serpent', icon: 'sea_serpent_small.png' },
      { label: 'Cyberse', value: 'Cyberse', icon: 'cyberse_small.png' },
      { label: 'Rock', value: 'Rock', icon: 'rock_small.png' },
      { label: 'Spellcaster', value: 'Spellcaster', icon: 'spellcaster_small.png' },
      { label: 'Wyrm', value: 'Wyrm', icon: 'wyrm_small.png' },
      { label: 'Plant', value: 'Plant', icon: 'plant_small.png' },
      { label: 'Zombie', value: 'Zombie', icon: 'zombie_small.png' },
      { label: 'Machine', value: 'Machine', icon: 'machine_small.png' },
      { label: 'Thunder', value: 'Thunder', icon: 'thunder_small.png' },
      { label: 'Winged Beast', value: 'Winged Beast', icon: 'winged_beast_small.png' },
      { label: 'Pyro', value: 'Pyro', icon: 'pyro_small.png' },
      { label: 'Beast', value: 'Beast', icon: 'beast_small.png' },
      { label: 'Fish', value: 'Fish', icon: 'fish_small.png' },
      { label: 'Fairy', value: 'Fairy', icon: 'fairy_small.png' },
      { label: 'Psychic', value: 'Psychic', icon: 'psychic_small.png' },
      { label: 'Insect', value: 'Insect', icon: 'insect_small.png' },
      { label: 'Dinosaur', value: 'Dinosaur', icon: 'dinosaur_small.png' },
      { label: 'Beast-Warrior', value: 'Beast-Warrior', icon: 'beast-warrior_small.png' },
      { label: 'Warrior', value: 'Warrior', icon: 'warrior_small.png' },
      { label: 'Fiend', value: 'Fiend', icon: 'fiend_small.png' },
      // { label: 'Divine-Beast', value: 'Divine-Beast', icon: "divine-beast_small.png" },
      { label: 'Quick-Play', value: 'Quick-Play', icon: 'quick-play_small.png' },
      { label: 'Equip', value: 'Equip', icon: 'equip_small.png' },
      { label: 'Field', value: 'Field', icon: 'field_small.png' },
      { label: 'Ritual', value: 'Ritual', icon: 'ritual_small.png' },
      { label: 'Counter', value: 'Counter', icon: 'counter_small.png' },
      { label: 'Continuous', value: 'Continuous', icon: 'continuous_small.png' },
    ];
    this.attributeOptions = [
      { label: 'Wind', value: 'WIND', icon: 'wind_small.png' },
      { label: 'Dark', value: 'DARK', icon: 'dark_small.png' },
      { label: 'Light', value: 'LIGHT', icon: 'light_small.png' },
      { label: 'Fire', value: 'FIRE', icon: 'fire_small.png' },
      { label: 'Water', value: 'WATER', icon: 'water_small.png' },
      { label: 'Earth', value: 'EARTH', icon: 'earth_small.png' },
      { label: 'Divine', value: 'DIVINE', icon: 'divine_small.png' },
    ];
    this.cardsService
      .getAllArchetypes()
      .subscribe((archetypes) => (this.archetypes = archetypes));

    this.searchStringChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchString: string | undefined) => {
        this.filters.searchText = searchString;
        this.filtersChanged();
      });
  }

  search(text: string) {
    this.searchStringChanged.next(text);
  }

  filtersChanged() {
    this.filtersChange.emit(this.filters);
  }

  filterArchetypes(event: any) {
    let query = event.query;

    if (query === '') this.filteredArchetypes = this.archetypes;

    this.filteredArchetypes = this.archetypes.filter((archetype) =>
      archetype.toLowerCase().includes(query.toLowerCase())
    );
  }
}
