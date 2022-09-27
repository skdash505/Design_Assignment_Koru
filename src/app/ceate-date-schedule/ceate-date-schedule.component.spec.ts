import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeateDateScheduleComponent } from './ceate-date-schedule.component';

describe('CeateDateScheduleComponent', () => {
  let component: CeateDateScheduleComponent;
  let fixture: ComponentFixture<CeateDateScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeateDateScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeateDateScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
