import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modulo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})
export class ModuloComponent {
  @Input() title: string = 'Título Padrão';
  @Input() modules: { name: string, progress: number }[] = [];
  showModules: boolean = false;

  // Alterna a visibilidade dos módulos
  toggleModules(): void {
    this.showModules = !this.showModules;
  }
}
