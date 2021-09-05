import { Component, Input, OnInit } from '@angular/core';
import { CollectionFilters } from 'src/app/models/collections/CollectionFilters.model';

@Component({
  selector: 'app-collection-filters',
  templateUrl: './collection-filters.component.html',
  styleUrls: ['./collection-filters.component.css'],
})
export class CollectionFiltersComponent implements OnInit {
  @Input() filters!: CollectionFilters;

  constructor() {}

  ngOnInit(): void {}
}
