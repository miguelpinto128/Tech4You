import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFuncionariosComponent } from './menu-funcionarios.component';

describe('MenuFuncionariosComponent', () => {
  let component: MenuFuncionariosComponent;
  let fixture: ComponentFixture<MenuFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuFuncionariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
