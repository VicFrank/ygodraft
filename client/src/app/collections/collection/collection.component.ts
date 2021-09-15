import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Collection } from 'src/app/models/collections/Collection.model';
import { CollectionCard } from 'src/app/models/collections/CollectionCard.model';
import { CollectionFilters } from 'src/app/models/collections/CollectionFilters.model';
import { CollectionsService } from 'src/app/_shared/collections.service';
import { CardFilterService } from './card-filter.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  collection: Collection = {
    created_at: new Date(),
    updated_at: new Date(),
    collection_id: -1,
    num_cards: 0,
    collection_cards: [],
  };
  filteredCards: CollectionCard[] = [];
  filters: CollectionFilters = {
    levels: [],
  };
  currentSort: string = 'Type';

  isNew: boolean = false;
  loading: boolean = true;

  constructor(
    private collectionsService: CollectionsService,
    private cardFilterer: CardFilterService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((value) => {
      if (value[0].path === 'new') {
        this.isNew = true;
        this.loading = false;
        if (this.collectionsService.newCollection) {
          this.collection = this.collectionsService.newCollection;
          this.filteredCards = this.collection.collection_cards;
          this.sortCollection();
          // order cards by type and name by default
        } else {
          // We don't have a new collection to go to
          this.router.navigate(['collections']);
        }
      } else if (value[0].path === 'collection') {
        const collectionID = value[1].path;
        this.collectionsService
          .getCollectionByID(collectionID)
          .subscribe((collection) => {
            this.collection = collection;
            this.filteredCards = this.collection.collection_cards;
            this.loading = false;
          });
      }
    });
  }

  filterCollection() {
    this.filteredCards = this.cardFilterer.filterCollection(
      this.collection.collection_cards,
      this.filters
    );
    this.sortCollection();
  }

  sortCollection() {
    this.cardFilterer.sortCollection(this.filteredCards, this.currentSort);
  }

  saveCollection() {
    this.collectionsService
      .createCollection(this.collection.collection_cards)
      .subscribe(
        (collection: any) => {
          const { collectionID } = collection;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Collection Created',
          });
          this.router.navigate([`collections/collection/${collectionID}`]);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error Creating Collection',
          });
        }
      );
  }
}
