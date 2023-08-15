import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddCommentInputComponent } from './user-add-comment-input.component';

describe('UserAddCommentInputComponent', () => {
  let component: UserAddCommentInputComponent;
  let fixture: ComponentFixture<UserAddCommentInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAddCommentInputComponent]
    });
    fixture = TestBed.createComponent(UserAddCommentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
