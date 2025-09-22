import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedTransactionCardComponent } from './detailed-transaction-card.component';

describe('DetailedTransactionCardComponent', () => {
  let component: DetailedTransactionCardComponent;
  let fixture: ComponentFixture<DetailedTransactionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedTransactionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedTransactionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
