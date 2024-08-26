import { Component, Input, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/login-service.service';
import { TelaLoginComponent } from '../tela-login/tela-login.component';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [NavBarComponent, CommonModule, FormsModule, TelaLoginComponent],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css'
})
export class CursoComponent implements OnInit {
  
  role: string = ''; // Armazena a role do usuário
  editMode: { [key in 'title' | 'subtitle' | 'text1']: boolean } = {
    title: false,
    subtitle: false,
    text1: false,
  };

  // Exemplo de textos editáveis
  subtitle = 'Módulo I | Introdução às Políticas da Eurofarma';
  title = 'Políticas da Empresa Eurofarma';

  constructor(private userService: UserService) {}

  loggedInUserId: string | null = '';

  ngOnInit() {

    this.userService.getLoggedInUserId().subscribe(userId => {
      this.loggedInUserId = userId;
      console.log('Logged in user ID:', userId);
    });

    
    const loggedInUserId = this.loggedInUserId;
    this.userService.getUserRole(loggedInUserId).subscribe(role => {
      this.role = role; // Armazena a role do usuário
      console.log(loggedInUserId)
      console.log(role)
      console.log(this.role)
    });
  }

  toggleEdit(section: 'title' | 'subtitle' | 'text1') {
    this.editMode[section] = !this.editMode[section];
    if (!this.editMode[section]) {
      // Lógica para "salvar" alterações localmente, se necessário
      this.saveChanges(section);
    }
  }

  saveChanges(section: 'title' | 'subtitle' | 'text1') {
    // Simplesmente loga a mudança localmente ou realiza outras ações necessárias
    console.log(`Alterações na seção ${section} foram salvas localmente.`);
  }
}


