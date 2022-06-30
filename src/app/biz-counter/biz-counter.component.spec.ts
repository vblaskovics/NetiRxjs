import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizCounterComponent } from './biz-counter.component';

describe('BizCounterComponent', () => {
  let component: BizCounterComponent;
  let fixture: ComponentFixture<BizCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BizCounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BizCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
