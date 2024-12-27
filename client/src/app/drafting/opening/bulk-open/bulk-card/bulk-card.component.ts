import { Component, Input } from '@angular/core';
import { PackCard } from 'src/app/models/drafting/PackCard.model';

@Component({
    selector: 'app-bulk-card',
    templateUrl: './bulk-card.component.html',
    styleUrls: ['./bulk-card.component.css'],
    standalone: false
})
export class BulkCardComponent {
  @Input() card!: PackCard;

  displayModal: boolean = false;
  constructor() {}
}
