import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryRawMaterialsComponent } from './entry-raw-materials.component';

describe('EntryRawMaterialsComponent', () => {
  let component: EntryRawMaterialsComponent;
  let fixture: ComponentFixture<EntryRawMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntryRawMaterialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryRawMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
