import { Component, Input, OnInit } from '@angular/core';
import { CollectionCard } from 'src/app/models/Card.model';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.css'],
  standalone: false,
})
export class CollectionCardComponent implements OnInit {
  @Input() card!: CollectionCard;
  @Input() isMasterDuelCard: boolean = false;
  displayModal: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
