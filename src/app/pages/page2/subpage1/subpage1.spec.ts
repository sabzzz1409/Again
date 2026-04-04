import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subpage1 } from './subpage1';

describe('Subpage1', () => {
  let component: Subpage1;
  let fixture: ComponentFixture<Subpage1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Subpage1],
    }).compileComponents();

    fixture = TestBed.createComponent(Subpage1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
