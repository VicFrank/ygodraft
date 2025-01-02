import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterDuelDraftingService } from '../master-duel-drafting.service';
import { SecretPackCard } from 'src/app/models/Card.model';

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

  constructor(
    private router: Router,
    private draftingService: MasterDuelDraftingService
  ) {}

  ngOnInit(): void {
    this.packsToOpen = this.draftingService.packsToOpen.length;

    if (this.packsToOpen === 0) {
      this.router.navigate(['secretpacks']);
    }

    this.nextPack();
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

  async skip() {
    this.draftingService.openAllPacks();
    this.draftingService.createCollection();
    this.router.navigate(['collections/new']);
  }
}
