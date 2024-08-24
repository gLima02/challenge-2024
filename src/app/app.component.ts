import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TelaLoginComponent } from './components/tela-login/tela-login.component';
import { PortalComponent } from './components/portal/portal.component';
import { CommonModule } from '@angular/common';
import { CursoComponent } from "./components/curso/curso.component";
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/login-service.service';
import { ProgressComponent } from './components/progress/progress.component';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProgressComponent, TelaLoginComponent, PortalComponent, CommonModule, CursoComponent, HttpClientModule, NavBarComponent, ProgressComponent],
  providers: [UserService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Swift Start Eurofarma';

}



