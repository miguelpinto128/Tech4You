import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainPageComponent } from './home-page/main-page/main-page.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './home-page/about/about.component';
import { ContactsComponent } from './home-page/contacts/contacts.component';
import { RmaComponent } from './home-page/rma/rma.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { RmaSearchComponent } from './rma-search/rma-search.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceService } from 'src/services/service.service';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuComponent } from './technician/menu/menu.component';
import { AdminNavbarComponent } from './technician/admin-navbar/admin-navbar.component';
import { MenuTableComponent } from './menu-table/menu-table.component';
import { MenuClientesComponent } from './menu-clientes/menu-clientes.component';
import { MenuEquipamentosComponent } from './menu-equipamentos/menu-equipamentos.component';
import { AuthService } from 'src/services/auth.service';
import { AuthInterceptor } from 'src/helpers/auth.interceptors';
import { NgxPaginationModule } from 'ngx-pagination';
import { MenuFuncionariosComponent } from './menu-funcionarios/menu-funcionarios.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainPageComponent,
    FooterComponent,
    AboutComponent,
    ContactsComponent,
    RmaComponent,
    LoginComponent,
    PrincipalComponent,
    RmaSearchComponent,
    ServiceDetailsComponent,
    NotFoundComponent,
    MenuComponent,
    AdminNavbarComponent,
    MenuTableComponent,
    MenuClientesComponent,
    MenuEquipamentosComponent,
    MenuFuncionariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
