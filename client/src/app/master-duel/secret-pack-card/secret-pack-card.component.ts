import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SecretPackCard } from 'src/app/models/Card.model';

@Component({
  selector: 'app-secret-pack-card',
  standalone: false,

  templateUrl: './secret-pack-card.component.html',
  styleUrl: './secret-pack-card.component.css',
})
export class SecretPackCardComponent {
  @Input() card!: SecretPackCard;
  @Input() index!: number;
  @Output() onCardFlipped = new EventEmitter();
  @Output() onCardSelected = new EventEmitter<number>();

  displayModal: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  flipCard() {
    this.card.flipped = !this.card.flipped;
    this.onCardFlipped.emit(this.index);
  }

  onCardClicked() {
    if (!this.card.flipped) return this.flipCard();
    else this.displayModal = true;
  }
}
