import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private draftingService: DraftingService
  ) {}

  ngOnInit(): void {
    this.setsToOpen = this.draftingService.setsToOpen.length;
    this.draftingService.openedPacks = [];

    if (this.setsToOpen === 0) {
      this.router.navigate(['drafting']);
    }
    this.nextSet();
  }

  async nextSet() {
    if (this.draftingService.setsToOpen.length === 0) return;

    this.currentSet = this.draftingService.setsToOpen.shift()!;

    this.packs = await this.draftingService.bulkOpenPacks(this.currentSet);
  }
}
