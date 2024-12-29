import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SecretPackCard } from 'src/app/models/Card.model';

@Component({
  selector: 'app-master-duel-card',
  templateUrl: './master-duel-card.component.html',
  styleUrl: './master-duel-card.component.css',
  standalone: false,
})
export class MasterDuelCardComponent {
  @Input() card!: SecretPackCard;
  displayModal: boolean = false;

  @Output() nextCard = new EventEmitter<void>();
  @Output() previousCard = new EventEmitter<void>();

  onCardClicked() {
    this.displayModal = true;
  }
}
