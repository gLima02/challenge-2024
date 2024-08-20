import { Routes } from '@angular/router';
import { TelaLoginComponent } from './components/tela-login/tela-login.component';

export const routes: Routes = [
    { path: 'login', component: TelaLoginComponent },
    { path: '', component: TelaLoginComponent },
];
