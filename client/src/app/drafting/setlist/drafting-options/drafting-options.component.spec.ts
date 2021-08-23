import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftingOptionsComponent } from './drafting-options.component';

describe('DraftingOptionsComponent', () => {
  let component: DraftingOptionsComponent;
  let fixture: ComponentFixture<DraftingOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftingOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftingOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
