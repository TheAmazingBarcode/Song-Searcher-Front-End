import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerCardComponent } from './performer-card.component';

describe('PerformerCardComponent', () => {
  let component: PerformerCardComponent;
  let fixture: ComponentFixture<PerformerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformerCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
