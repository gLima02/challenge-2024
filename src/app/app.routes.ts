import { Routes } from '@angular/router';
import { CursoComponent } from './components/curso/curso.component';
import { PortalComponent } from './components/portal/portal.component';
import { TelaLoginComponent } from './components/tela-login/tela-login.component';

export const routes: Routes = [
  {path: '#', component: TelaLoginComponent},
  {path: 'portal', component: PortalComponent},
  {path: 'curso-atv', component: CursoComponent}
];
