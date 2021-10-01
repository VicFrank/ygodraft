import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PackCard } from 'src/app/models/drafting/PackCard.model';
import { DraftingService } from '../../drafting.service';

@Component({
  selector: 'app-pack-opening',
  templateUrl: './pack-opening.component.html',
  styleUrls: ['./pack-opening.component.css'],
})
export class PackOpeningComponent implements OnInit {
  cardset: string = '';
  packsOpened: number = 0;
  packsToOpen: number = 0;
  allFlipped: boolean = false;
  draftMode?: string;
  isDrafting: boolean = false;
  canProgress: boolean = false;

  errorMessage?: string;

  currentPack: PackCard[] = [];

  constructor(
    private router: Router,
    private draftingService: DraftingService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.packsToOpen = this.draftingService.packsToOpen.length;
    this.draftMode = this.draftingService.draftOptions?.draftMode;

    if (this.packsToOpen === 0) {
      // We don't have any packs to open, redirect back to drafting
      this.router.navigate(['drafting']);
    }

    if (this.draftMode === 'Chaos Draft') {
      this.isDrafting = true;
    }
    this.nextPack();
  }

  async nextPack() {
    if (this.draftingService.packsToOpen.length === 0) return;

    this.cardset = this.draftingService.packsToOpen.shift()!;
    this.packsOpened += 1;

    if (this.isDrafting) {
      this.draftingService.addCardsToDraft(this.getSelectedCards());
    }

    try {
      this.currentPack = await this.draftingService.openSinglePack(
        this.cardset
      );
    } catch (error) {
      this.errorMessage = 'Error opening pack';
    }
    this.allFlipped = false;
  }

  onCardFlipped() {
    this.allFlipped = !this.currentPack.some((card) => !card.flipped);
    this.updateCanProgress();
  }

  onCardSelected(index: number) {
    // deselect all the other cards
    this.currentPack = this.currentPack.map((card) => ({
      ...card,
      selected: false,
    }));
    this.currentPack[index].selected = true;
    this.updateCanProgress();
  }

  getSelectedCards() {
    return this.currentPack.filter((card) => card.selected);
  }

  updateCanProgress() {
    this.canProgress = true;
    if (!this.allFlipped) this.canProgress = false;
    if (this.isDrafting && this.getSelectedCards().length === 0)
      this.canProgress = false;
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
    this.updateCanProgress();
  }

  async goToCollection() {
    if (this.isDrafting) {
      this.draftingService.addCardsToDraft(this.getSelectedCards());
    }

    try {
      await this.draftingService.createCollection();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error creating collection',
      });
      return;
    }
    this.router.navigate(['collections/new']);
  }
}
