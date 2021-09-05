import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionFiltersComponent } from './collection-filters.component';

describe('CollectionFiltersComponent', () => {
  let component: CollectionFiltersComponent;
  let fixture: ComponentFixture<CollectionFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
