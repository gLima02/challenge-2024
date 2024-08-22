import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TelaLoginComponent } from './components/tela-login/tela-login.component';
import { PortalComponent } from './components/portal/portal.component';
import { CommonModule } from '@angular/common';
import { CursoComponent } from "./components/curso/curso.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TelaLoginComponent, PortalComponent, CommonModule, CursoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Swift Start Eurofarma';
}
