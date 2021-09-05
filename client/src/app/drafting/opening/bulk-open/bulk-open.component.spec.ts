import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkOpenComponent } from './bulk-open.component';

describe('BulkOpenComponent', () => {
  let component: BulkOpenComponent;
  let fixture: ComponentFixture<BulkOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkOpenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
