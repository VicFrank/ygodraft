import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cardset } from 'src/app/models/Cardset.model';

@Component({
  selector: 'app-setlist-pack',
  templateUrl: './setlist-pack.component.html',
  styleUrls: ['./setlist-pack.component.css'],
})
export class SetlistPackComponent implements OnInit {
  @Input()
  set!: Cardset;
  @Input() selectedSets!: string[];
  @Output() selectedSetsChange = new EventEmitter<string[]>();

  src: string = '';
  name: string = '';

  constructor() {}

  ngOnInit(): void {
    this.name = this.set.set_name;
    if (this.name === 'Legend of Blue Eyes White Dragon')
      this.name = 'Legend of Blue Eyes';
    this.src = `assets/images/cardsets/${this.set.set_code}.jpg`;
  }

  toggleSelected() {
    const setName = this.set.set_name;
    const isSelected = this.selectedSets.some((set) => set === setName);
    if (isSelected) {
      this.selectedSets = this.selectedSets.filter((set) => set !== setName);
    } else {
      this.selectedSets.push(setName);
    }
    this.selectedSetsChange.emit([...this.selectedSets]);
  }
}
