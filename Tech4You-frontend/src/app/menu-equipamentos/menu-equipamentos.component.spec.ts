import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEquipamentosComponent } from './menu-equipamentos.component';

describe('MenuEquipamentosComponent', () => {
  let component: MenuEquipamentosComponent;
  let fixture: ComponentFixture<MenuEquipamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuEquipamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEquipamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
