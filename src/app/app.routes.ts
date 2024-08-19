import { Routes } from '@angular/router';
import { TelaLoginComponent } from './components/tela-login/tela-login.component';
import { WellcomePageComponent } from './components/wellcome-page/wellcome-page.component';

export const routes: Routes = [
    { path: 'login', component: TelaLoginComponent },
    { path: '', component: TelaLoginComponent },
    { path: 'welcome', component: WellcomePageComponent },
];
