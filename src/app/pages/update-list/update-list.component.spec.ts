import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyListComponent } from './update-list.component';

describe('ModifyListComponent', () => {
  let component: ModifyListComponent;
  let fixture: ComponentFixture<ModifyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
