import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PackCard } from 'src/app/models/drafting/PackCard.model';

@Component({
  selector: 'app-pack-card',
  templateUrl: './pack-card.component.html',
  styleUrls: ['./pack-card.component.css'],
})
export class PackCardComponent implements OnInit {
  @Input() card!: PackCard;
  @Output() onCardFlipped = new EventEmitter();

  displayModal: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  flipCard() {
    this.card.flipped = true;
    this.onCardFlipped.emit();
  }

  openModal() {
    this.displayModal = true;
  }
}
