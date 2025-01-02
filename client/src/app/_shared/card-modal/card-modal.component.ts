import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/Card.model';

@Component({
  selector: 'app-card-modal',
  standalone: false,

  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css',
})
export class CardModalComponent {
  @Input() card!: Card;
  @Input() displayModal: boolean = false;
}
