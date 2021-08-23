import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackOpeningTraditionalComponent } from './pack-opening-traditional.component';

describe('PackOpeningTraditionalComponent', () => {
  let component: PackOpeningTraditionalComponent;
  let fixture: ComponentFixture<PackOpeningTraditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackOpeningTraditionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackOpeningTraditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
