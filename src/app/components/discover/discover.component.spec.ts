import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicoverComponent } from './discover.component';

describe('DicoverComponent', () => {
  let component: DicoverComponent;
  let fixture: ComponentFixture<DicoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DicoverComponent]
    });
    fixture = TestBed.createComponent(DicoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
