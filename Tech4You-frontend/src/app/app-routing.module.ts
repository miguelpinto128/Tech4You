import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuClientesComponent } from './menu-clientes/menu-clientes.component';
import { MenuEquipamentosComponent } from './menu-equipamentos/menu-equipamentos.component';
import { MenuFuncionariosComponent } from './menu-funcionarios/menu-funcionarios.component';
import { MenuTableComponent } from './menu-table/menu-table.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PrincipalComponent } from './principal/principal.component';
import { RmaSearchComponent } from './rma-search/rma-search.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { MenuComponent } from './technician/menu/menu.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'rma-search', component: RmaSearchComponent },
  { path: 'service-details/:search', component: ServiceDetailsComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'menu-funcionarios', component: MenuFuncionariosComponent },
  { path: 'menu-table', component: MenuTableComponent },
  { path: 'menu-clientes', component: MenuClientesComponent },
  { path: 'menu-equipamentos', component: MenuEquipamentosComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
