import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PackCard } from 'src/app/models/drafting/PackCard.model';

@Component({
    selector: 'app-pack-card',
    templateUrl: './pack-card.component.html',
    styleUrls: ['./pack-card.component.css'],
    standalone: false
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
    this.card.flipped = !this.card.flipped;
    this.onCardFlipped.emit(this.index);
  }

  onCardClicked() {
    if (!this.card.flipped) return this.flipCard();
    if (this.selectable) {
      this.card.selected = !this.card.selected;
      // this is so we deselect all the cards
      if (!this.card.selected) this.onCardSelected.emit(-1);
      else this.onCardSelected.emit(this.index);
    } else {
      this.displayModal = true;
    }
  }
}
