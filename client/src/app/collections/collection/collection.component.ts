import { Component, OnInit } from '@angular/core';
import { CollectionCard } from 'src/app/models/CollectionCard.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  cards: CollectionCard[] = [];
  filteredCards: CollectionCard[] = [];
  filters: any = {};

  constructor() {}

  ngOnInit(): void {}
}
