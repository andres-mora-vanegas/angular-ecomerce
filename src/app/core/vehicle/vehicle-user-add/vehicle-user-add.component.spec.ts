import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleUserAddComponent } from './vehicle-user-add.component';

describe('VehicleUserAddComponent', () => {
  let component: VehicleUserAddComponent;
  let fixture: ComponentFixture<VehicleUserAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleUserAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
