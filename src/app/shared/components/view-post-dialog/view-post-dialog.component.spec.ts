import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostDialogComponent } from './view-post-dialog.component';

describe('ViewPostDialogComponent', () => {
  let component: ViewPostDialogComponent;
  let fixture: ComponentFixture<ViewPostDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPostDialogComponent]
    });
    fixture = TestBed.createComponent(ViewPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
