import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTestResultsComponent } from './user-test-results.component';

describe('UserTestResultsComponent', () => {
  let component: UserTestResultsComponent;
  let fixture: ComponentFixture<UserTestResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTestResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTestResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
