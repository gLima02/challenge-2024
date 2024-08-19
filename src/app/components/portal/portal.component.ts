import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css'] // Corrigido de 'styleUrl' para 'styleUrls'
})
export class PortalComponent {
  // Controle da visibilidade dos módulos
  showModules: boolean = false;

  // Lista de módulos
  modules = [
    { name: 'Módulo 1 | Básico I', progress: 100 },
    { name: 'Módulo 2 | Básico II', progress: 33 },
    { name: 'Módulo 3 | Intermediário I', progress: 0 },
    { name: 'Módulo 4 | Intermediário II', progress: 0 },
    { name: 'Módulo 5 | Avançado', progress: 0 }
  ];

  // Alterna a visibilidade dos módulos
  toggleModules(): void {
    this.showModules = !this.showModules;
  }
}

