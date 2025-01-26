import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SecretPacksService } from 'src/app/_shared/secret-packs.service';
import { SecretPack } from 'src/app/models/secret_packs/SecretPack.model';
import { MasterDuelDraftingService } from '../master-duel-drafting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secret-packs',
  templateUrl: './secret-packs.component.html',
  styleUrl: './secret-packs.component.css',
  standalone: false,
})
export class SecretPacksComponent implements OnInit, OnDestroy {
  secretPacks: SecretPack[] = [];
  isLoading: boolean = true;
  searchText: string = '';
  packsToOpen: number = 10;
  private searchTerms = new Subject<string>();
  private searchSubscription: Subscription;

  constructor(
    private secretPacksService: SecretPacksService,
    private draftingService: MasterDuelDraftingService,
    private router: Router
  ) {
    this.searchSubscription = this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.secretPacksService.getSecretPacks(term))
      )
      .subscribe((packs) => {
        this.secretPacks = packs;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.searchTerms.next('');
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  searchPacks(): void {
    this.isLoading = true;
    this.searchTerms.next(this.searchText);
  }

  async openPacks() {
    this.draftingService.resetDraft();

    await this.draftingService.generatePacks(this.packsToOpen);

    this.router.navigate(['/secretpacks/opening']);
  }
}
