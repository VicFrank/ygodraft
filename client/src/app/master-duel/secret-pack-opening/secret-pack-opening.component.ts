import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterDuelDraftingService } from '../master-duel-drafting.service';
import { SecretPackCard } from 'src/app/models/Card.model';
import { MenuItem } from 'primeng/api';
import { CollectionsService } from 'src/app/_shared/collections.service';
import { UserCollection } from 'src/app/models/collections/UserCollection.model';

@Component({
  selector: 'app-secret-pack-opening',
  standalone: false,

  templateUrl: './secret-pack-opening.component.html',
  styleUrl: './secret-pack-opening.component.css',
})
export class SecretPackOpeningComponent implements OnInit {
  loadingCollection: boolean = false;
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

  showCollectionDialog = false;
  collections: UserCollection[] = [];
  newCollectionName = '';

  selectedCollectionId?: number;

  private previousCount = 0;
  isCountChanged = false;

  get unlockedSecretPacks(): string[] {
    return this.draftingService.unlockedSecretPacks;
  }

  get numUnlockedSecretPacks(): number {
    const unflippedKeyCards = this.currentPack.filter(
      (card) => card.secret_packs && !card.flipped
    );
    const count =
      this.draftingService.unlockedSecretPacks.length -
      unflippedKeyCards.length;
    if (count !== this.previousCount) {
      this.previousCount = count;
      this.isCountChanged = true;
      setTimeout(() => (this.isCountChanged = false), 300);
    }
    return count;
  }

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
        this.collections = collections;
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

  async finish() {
    this.showCollectionDialog = true;
  }

  async confirmCollection(collectionId?: number, newName?: string) {
    this.loadingCollection = true;
    try {
      if (collectionId) {
        await this.draftingService.addToCollection(collectionId);
        this.router.navigate(['collections/collection', collectionId]);
      } else if (newName) {
        this.draftingService.createCollection(newName);
        this.router.navigate(['collections/new']);
      }
    } catch (error) {
      this.errorMessage = 'Failed to add cards to collection';
    } finally {
      this.loadingCollection = false;
      this.showCollectionDialog = false;
    }
  }
}
