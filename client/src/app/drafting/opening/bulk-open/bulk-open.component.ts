import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PackCard } from 'src/app/models/drafting/PackCard.model';
import { DraftingService } from '../../drafting.service';

@Component({
  selector: 'app-bulk-open',
  templateUrl: './bulk-open.component.html',
  styleUrls: ['./bulk-open.component.css'],
})
export class BulkOpenComponent implements OnInit {
  packs: PackCard[][] = [];
  setsToOpen: number = 0;
  currentSet: string = '';
  errorMessage?: string;

  constructor(
    private router: Router,
    private draftingService: DraftingService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.setsToOpen = this.draftingService.setsToOpen.length;

    if (this.setsToOpen === 0) {
      this.router.navigate(['drafting']);
    }
    this.openAllSets();
  }

  async openAllSets() {
    try {
      this.packs = await this.draftingService.openAllSets();
    } catch (error) {
      this.errorMessage = 'There was an error generating the packs.';
    }
  }

  async createCollection() {
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
