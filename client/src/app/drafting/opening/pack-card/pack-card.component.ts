import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PackCard } from 'src/app/models/drafting/PackCard.model';

@Component({
  selector: 'app-pack-card',
  templateUrl: './pack-card.component.html',
  styleUrls: ['./pack-card.component.css'],
})
export class PackCardComponent implements OnInit {
  @Input() card!: PackCard;
  @Input() index!: number;
  @Input() selectable: boolean = false;
  @Output() onCardFlipped = new EventEmitter();
  @Output() onCardSelected = new EventEmitter<number>();

  displayModal: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  flipCard() {
    this.card.flipped = true;
    this.onCardFlipped.emit();
  }

  onCardClicked() {
    if (!this.card.flipped) return this.flipCard();
    if (this.selectable) {
      this.card.selected = true;
      this.onCardSelected.emit(this.index);
    } else {
      this.displayModal = true;
    }
  }
}
