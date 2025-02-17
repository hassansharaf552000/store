import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToInventoryComponent } from './add-to-inventory.component';

describe('AddToInventoryComponent', () => {
  let component: AddToInventoryComponent;
  let fixture: ComponentFixture<AddToInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddToInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
