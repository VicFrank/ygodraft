import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectableCollectionComponent } from './selectable-collection.component';

describe('SelectableCollectionComponent', () => {
  let component: SelectableCollectionComponent;
  let fixture: ComponentFixture<SelectableCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectableCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectableCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
