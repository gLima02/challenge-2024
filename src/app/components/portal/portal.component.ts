import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ModuloComponent } from '../modulo/modulo.component';
import { CursoComponent } from "../curso/curso.component";

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [CommonModule, NavBarComponent, ModuloComponent, CursoComponent],
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css'] // Corrigido de 'styleUrl' para 'styleUrls'
})
export class PortalComponent {
  // Controle da visibilidade dos módulos
 
}

