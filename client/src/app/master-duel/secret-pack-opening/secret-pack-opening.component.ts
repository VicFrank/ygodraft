import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterDuelDraftingService } from '../master-duel-drafting.service';
import { SecretPackCard } from 'src/app/models/Card.model';
import { MenuItem } from 'primeng/api';
import { CollectionsService } from 'src/app/_shared/collections.service';

@Component({
  selector: 'app-secret-pack-opening',
  standalone: false,

  templateUrl: './secret-pack-opening.component.html',
  styleUrl: './secret-pack-opening.component.css',
})
export class SecretPackOpeningComponent implements OnInit {
  packsOpened: number = 0;
  packsToOpen: number = 0;
  allFlipped: boolean = false;
  errorMessage: string | undefined;

  currentPack: SecretPackCard[] = [];

  selectedPackQuantity = 1;

  packOptions: MenuItem[] = [
    { label: '1 Pack', command: () => (this.selectedPackQuantity = 1) },
    { label: '10 Packs', command: () => (this.selectedPackQuantity = 10) },
  ];

  collectionOptions: MenuItem[] = [
    {
      label: 'New Collection',
      command: () => (this.selectedCollectionId = undefined),
    },
  ];

  selectedCollectionId?: number;

  constructor(
    private router: Router,
    private draftingService: MasterDuelDraftingService,
    private collectionsService: CollectionsService
  ) {}

  ngOnInit(): void {
    this.packsToOpen = this.draftingService.packsToOpen.length;

    if (this.packsToOpen === 0) {
      this.router.navigate(['secretpacks']);
    }

    this.nextPack();

    this.collectionsService.getUserCollections().subscribe({
      next: (collections) => {
        if (collections.length === 0) return;

        this.collectionOptions = collections.map((collection) => ({
          label: collection.collection_name,
          command: () => (this.selectedCollectionId = collection.collection_id),
        }));
      },
      error: (error) => {
        console.error('Failed to load collections:', error);
        this.errorMessage = 'Failed to load collections';
      },
    });
  }

  nextPack() {
    if (this.draftingService.packsToOpen.length === 0) return;

    this.packsOpened += 1;

    try {
      this.currentPack = this.draftingService.openSinglePack();
    } catch (error) {
      this.errorMessage = 'Error opening pack';
    }
    this.allFlipped = false;
  }

  onCardFlipped() {
    this.allFlipped = !this.currentPack.some((card) => !card.flipped);
  }

  flipAll() {
    let delay = 0;
    const increment = 30;
    for (let card of this.currentPack) {
      setTimeout(() => {
        card.flipped = true;
      }, delay);
      delay += increment;
    }
    this.allFlipped = true;
  }

  async addMorePacks() {
    await this.draftingService.generatePacks(this.selectedPackQuantity);
    this.packsToOpen = this.packsToOpen + this.selectedPackQuantity;
    this.nextPack();
  }

  skip() {
    this.packsOpened = this.packsToOpen;
    this.draftingService.openAllPacks();
    this.flipAll();
  }

  finish() {
    if (this.selectedCollectionId) {
      this.draftingService.addToCollection(this.selectedCollectionId);
    } else {
      this.draftingService.createCollection();
    }
    this.router.navigate(['collections/new']);
  }
}
