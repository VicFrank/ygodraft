import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Collection } from 'src/app/models/collections/Collection.model';
import { CollectionCard } from 'src/app/models/collections/CollectionCard.model';
import { CollectionFilters } from 'src/app/models/collections/CollectionFilters.model';
import { AuthService } from 'src/app/_shared/auth.service';
import { CollectionsService } from 'src/app/_shared/collections.service';
import { CardFilterService } from './card-filter.service';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.css'],
    standalone: false
})
export class CollectionComponent implements OnInit {
  collection: Collection = {
    created_at: new Date(),
    updated_at: new Date(),
    collection_id: -1,
    num_cards: 0,
    collection_cards: [],
    collection_name: '',
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
    private messageService: MessageService,
    private authService: AuthService,
    private confirmationService: ConfirmationService
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
        this.collectionsService.getCollectionByID(collectionID).subscribe(
          (collection) => {
            this.collection = collection;
            this.filteredCards = this.collection.collection_cards;
            this.loading = false;
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Collection not found',
            });
            this.router.navigate([`collections`]);
          }
        );
      }
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
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

  createCollection() {
    this.collectionsService.createCollection(this.collection).subscribe(
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

  updateCollection() {
    this.collectionsService.updateCollection(this.collection).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Collection Changes Saved',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error Updating Collection',
        });
      }
    );
  }

  updateCollectionName() {
    const { collection_id, collection_name } = this.collection;
    this.collectionsService
      .updateCollectionName(collection_id, collection_name)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Updated Name',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error Updating Collection',
          });
        }
      );
  }

  deleteCollection() {
    this.collectionsService
      .deleteCollection(this.collection.collection_id)
      .subscribe(
        () => {
          this.router.navigate([`collections`]);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error deleting collection',
          });
        }
      );
  }

  confirmDelete() {
    console.log('confirm delete');
    this.confirmationService.confirm({
      message: `Are you sure you want to delete this collection?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteCollection();
      },
    });
  }
}
