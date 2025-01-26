import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecretPacksService } from 'src/app/_shared/secret-packs.service';
import { SecretPackCard } from 'src/app/models/Card.model';
import { SecretPack } from 'src/app/models/secret_packs/SecretPack.model';
import { MasterDuelDraftingService } from '../master-duel-drafting.service';

interface ChartData {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      tension: number;
    }[];
  };
  options: any;
}
@Component({
  selector: 'app-secret-pack',
  templateUrl: './secret-pack.component.html',
  styleUrl: './secret-pack.component.css',
  standalone: false,
})
export class SecretPackComponent implements OnInit {
  secretPack: SecretPack = {
    secret_pack_id: 0,
    set_name: '',
    image_name: '',
    cards: [],
  };

  numPacks = 10;
  isPityPack = false;
  selectedGraphType = 'Cumulative';
  graphTypes = ['Individual', 'Cumulative'];
  chartData: ChartData = {
    data: {
      labels: [],
      datasets: [],
    },
    options: {},
  };

  loading = false;

  packsToOpen = 10;

  constructor(
    private secretPacksService: SecretPacksService,
    private draftingService: MasterDuelDraftingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');

    if (id != null) {
      this.secretPacksService.getSecretPack(id).subscribe((secretPack) => {
        this.secretPack = secretPack;
        this.calculateOdds();
        this.loading = false;
      });
    } else {
      this.router.navigate(['/secretpacks']);
    }
  }

  nextCard(card: SecretPackCard) {
    const index = this.secretPack.cards.indexOf(card);

    if (index < this.secretPack.cards.length - 1) {
      // open the dialog for the next card
      // TODO: probably have to make the dialog on this page, rather than on the card
    }
  }

  previousCard(card: SecretPackCard) {
    const index = this.secretPack.cards.indexOf(card);

    if (index > 0) {
      // open the dialog for the previous card
    }
  }

  calculateOdds() {
    // 4 secret pack cards per pack
    // 3 normal slots, 1 rare slot
    // 10th pack, rare slot is guaranteed slot, unless you're on a pity pack

    // - Normal Slots: UR 2.5%, SR 7.5%, R 35%, N 55%
    // - Rare Slots: UR 2.5%, SR 7.5%, R 90%
    // - Guaranteed Slot: UR 20%, SR 80%
    // - Pity Slot: UR 100%

    // Calculate the odds of getting a specific card of each rarity, given the number of packs opened
    // UR, SR, R, N

    const numCommon = this.secretPack.cards.filter(
      (card) => card.md_rarity === 'Common'
    ).length;
    const numRare = this.secretPack.cards.filter(
      (card) => card.md_rarity === 'Rare'
    ).length;
    const numSuperRare = this.secretPack.cards.filter(
      (card) => card.md_rarity === 'Super Rare'
    ).length;
    const numUltraRare = this.secretPack.cards.filter(
      (card) => card.md_rarity === 'Ultra Rare'
    ).length;

    const totalCards = this.numPacks * 4;

    let odds = [0, 0, 0, 0];

    let normalSlots = 3 * this.numPacks;
    let rareSlots = this.numPacks;
    let guaranteedSlots = 0;
    let pitySlots = 0;

    if (this.isPityPack) pitySlots = 1;
    guaranteedSlots = Math.floor(this.numPacks / 10);

    guaranteedSlots -= pitySlots;
    rareSlots -= guaranteedSlots;

    let normalSlotOdds = [0.025, 0.075, 0.35, 0.55];
    let rareSlotOdds = [0.025, 0.075, 0.9];
    let guaranteedSlotOdds = [0.2, 0.8];
    let pitySlotOdds = [1];

    odds[0] =
      normalSlotOdds[0] * normalSlots +
      rareSlotOdds[0] * rareSlots +
      guaranteedSlotOdds[0] * guaranteedSlots +
      pitySlotOdds[0] * pitySlots;
    odds[1] =
      normalSlotOdds[1] * normalSlots +
      rareSlotOdds[1] * rareSlots +
      guaranteedSlotOdds[1] * guaranteedSlots;
    odds[2] = normalSlotOdds[2] * normalSlots + rareSlotOdds[2] * rareSlots;
    odds[3] = normalSlotOdds[3] * normalSlots;

    const oddsToHit = odds.map((odd) => odd / totalCards);

    const oddsToMiss = [0, 0, 0, 0];
    oddsToMiss[0] = 100 * Math.pow(1 - oddsToHit[0] / numUltraRare, totalCards);
    oddsToMiss[1] = 100 * Math.pow(1 - oddsToHit[1] / numSuperRare, totalCards);
    oddsToMiss[2] = 100 * Math.pow(1 - oddsToHit[2] / numRare, totalCards);
    oddsToMiss[3] = 100 * Math.pow(1 - oddsToHit[3] / numCommon, totalCards);

    // console.log(oddsToMiss);

    // Get the odds of getting a specific card of each rarity
    odds[0] = odds[0] / numUltraRare;
    odds[1] = odds[1] / numSuperRare;
    odds[2] = odds[2] / numRare;
    odds[3] = odds[3] / numCommon;

    const copies = [0, 1, 2, 3, 4, 5, 6, 7];

    // prettier-ignore
    this.chartData = {
      data: {
        labels: copies.map(n => n.toString()),
        datasets: [{
          label: 'Ultra Rare',
          data: copies.map(k => this.calculateProbability(totalCards, k, oddsToHit[0]/numUltraRare) * 100),
          borderColor: '#cc28f1',
          backgroundColor: '#cc28f140',
          tension: 0.4
        }, {
          label: 'Super Rare',
          data: copies.map(k => this.calculateProbability(totalCards, k, oddsToHit[1]/numSuperRare) * 100),
          borderColor: '#e5ff00',
          backgroundColor: '#e5ff0040',
          tension: 0.4
        }, {
          label: 'Rare',
          data: copies.map(k => this.calculateProbability(totalCards, k, oddsToHit[2]/numRare) * 100),
          borderColor: '#0c54e4',
          backgroundColor: '#0c54e440',
          tension: 0.4
        }, {
          label: 'Common',
          data: copies.map(k => this.calculateProbability(totalCards, k, oddsToHit[3]/numCommon) * 100),
          borderColor: '#6f686a',
          backgroundColor: '#6f686a40',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const label = context.dataset.label || '';
                const value = context.parsed.y;
                return `${label}: ${value.toFixed(2)}%`;
              },
              title: (context: any) => {
                const title = context[0].label;
                return `${title}${this.selectedGraphType == 'Individual' ? '' : '+'} ${title == 1 ? 'Copy' : 'Copies'}`;
              }
            }
          },
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: this.selectedGraphType == 'Individual' ?
              'Probability of Pulling X Copies of a Specific Card' :
              'Probability of Pulling X or More Copies of a Specific Card'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Probability (%)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Number of Copies'
            }
          }
        }
      }
    };
  }

  private calculateProbability(n: number, k: number, p: number): number {
    if (this.selectedGraphType === 'Individual') {
      return this.calculateBinomialProbability(n, k, p);
    } else {
      return this.calculateTotalProbability(n, k, p);
    }
  }

  private calculateBinomialProbability(
    n: number,
    k: number,
    p: number
  ): number {
    const coefficient = this.binomialCoefficient(n, k);
    return coefficient * Math.pow(p, k) * Math.pow(1 - p, n - k);
  }

  private binomialCoefficient(n: number, k: number): number {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;

    let coefficient = 1;
    for (let i = 0; i < k; i++) {
      coefficient *= (n - i) / (i + 1);
    }
    return coefficient;
  }

  private calculateTotalProbability(n: number, k: number, p: number): number {
    let totalProbability = 0;
    for (let i = k; i <= n; i++) {
      totalProbability += this.calculateBinomialProbability(n, i, p);
    }
    return totalProbability;
  }

  async openPacks(): Promise<void> {
    this.draftingService.resetDraft();

    await this.draftingService.generatePacks(
      this.packsToOpen,
      this.secretPack.secret_pack_id
    );

    this.router.navigate(['/secretpacks/opening']);
  }
}
