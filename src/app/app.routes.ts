import { Routes } from '@angular/router';
import { CursoComponent } from './components/curso/curso.component';
import { PortalComponent } from './components/portal/portal.component';
import { ProgressComponent } from './components/progress/progress.component';
import { TelaLoginComponent } from './components/tela-login/tela-login.component';
import { CriarCursoComponent } from './components/criar-curso/criar-curso.component';

export const routes: Routes = [
  { path: '', component: TelaLoginComponent },
  { path: '#', component: TelaLoginComponent },
  { path: 'login', component: TelaLoginComponent },
  { path: 'portal', component: PortalComponent },
  { path: 'curso-atv', component: CursoComponent },
  { path: 'progresso', component: ProgressComponent },
  { path: 'criar', component: CriarCursoComponent}
];
