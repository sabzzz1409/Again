import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subpage2 } from './subpage2';

describe('Subpage2', () => {
  let component: Subpage2;
  let fixture: ComponentFixture<Subpage2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Subpage2],
    }).compileComponents();

    fixture = TestBed.createComponent(Subpage2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
