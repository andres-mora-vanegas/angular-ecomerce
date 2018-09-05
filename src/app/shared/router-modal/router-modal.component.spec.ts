import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModalComponent } from './router-modal.component';

describe('RouterModalComponent', () => {
  let component: RouterModalComponent;
  let fixture: ComponentFixture<RouterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
