import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetlistPackComponent } from './setlist-pack.component';

describe('SetlistPackComponent', () => {
  let component: SetlistPackComponent;
  let fixture: ComponentFixture<SetlistPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetlistPackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetlistPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
