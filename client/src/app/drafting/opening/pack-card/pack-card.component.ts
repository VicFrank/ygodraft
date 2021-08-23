import { Component, Input, OnInit } from '@angular/core';
import { PackCard } from 'src/app/models/drafting/PackCard.model';

@Component({
  selector: 'app-pack-card',
  templateUrl: './pack-card.component.html',
  styleUrls: ['./pack-card.component.css'],
})
export class PackCardComponent implements OnInit {
  @Input() card!: PackCard;

  displayModal: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  flipCard() {
    this.card.flipped = true;
  }

  openModal() {
    this.displayModal = true;
  }
}
