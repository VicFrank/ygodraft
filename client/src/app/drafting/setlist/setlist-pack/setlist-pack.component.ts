import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-setlist-pack',
  templateUrl: './setlist-pack.component.html',
  styleUrls: ['./setlist-pack.component.css'],
})
export class SetlistPackComponent implements OnInit {
  @Input()
  code!: string;
  @Input()
  name!: string;
  @Input() selectedSets!: string[];
  @Output() selectedSetsChange = new EventEmitter<string[]>();

  src: string;

  constructor() {
    this.src = `assets/images/cardsets/${this.code}.jpg`;
  }

  ngOnInit(): void {
    if (this.name === 'Legend of Blue Eyes White Dragon')
      this.name = 'Legend of Blue Eyes';
  }
}
