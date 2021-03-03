import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { Routes ,RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './componente/usuario/usuario/usuario.component';
import { UsuarioAddComponent } from './componente/usuario/usuario-add/usuario-add.component';
import { UsuarioReportComponent } from './componente/usuario/usuario-report/usuario-report.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { GuardiaoGuard } from './service/guardiao.guard';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCurrencyModule } from 'ngx-currency';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './componente/bar-chart/bar-chart.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

export const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [GuardiaoGuard]},
  {path: 'usuarioList', component: UsuarioComponent, canActivate: [GuardiaoGuard]},
  {path: 'usuarioAdd', component: UsuarioAddComponent, canActivate: [GuardiaoGuard]},
  {path: 'usuarioAdd/:id', component: UsuarioAddComponent, canActivate: [GuardiaoGuard]},
  {path: 'usuarioReport', component: UsuarioReportComponent, canActivate: [GuardiaoGuard]},
  {path: 'barChart', component: BarChartComponent, canActivate: [GuardiaoGuard]}
]
export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsuarioComponent,
    UsuarioAddComponent,
    UsuarioReportComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    routes,
    NgxPaginationModule,
    HttpInterceptorModule,
    NgxMaskModule.forRoot(maskConfig),
    NgbModule,
    NgxCurrencyModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
