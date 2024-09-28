import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ModuloComponent } from '../modulo/modulo.component';
import { CursoComponent } from "../curso/curso.component";
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/login-service.service';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [CommonModule, NavBarComponent, ModuloComponent, CursoComponent, RouterModule],
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css'] // Corrigido de 'styleUrl' para 'styleUrls'
})
export class PortalComponent implements OnInit {
  courses: any[] = []; // Array para armazenar os cursos

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit() {
    this.getCourses(); // Chama a função para obter os cursos ao inicializar
  }

  getCourses() {
    // Obtendo o ID do usuário logado
    this.userService.getLoggedInUserId().subscribe(userId => {
      if (userId) {
        this.userService.getUsers().subscribe((users: any[]) => {
          // Buscando o usuário correspondente ao userId
          const user = users.find(u => u.id === userId);
          if (user) {
            const userCourses = user.courses; // Obtendo cursos do usuário logado
            
            // Transformando os cursos para o formato desejado
            this.courses = Object.keys(userCourses).map(courseKey => {
              const course = userCourses[courseKey];
              return {
                title: course.title,
                modules: course.modules.map((module: { moduleTitle: any; }) => ({
                  name: module.moduleTitle,
                  // Gerando um progresso aleatório entre 0 e 100
                  progress: Math.floor(Math.random() * 101) // Mocked progress
                }))
              };
            });
          }
        });
      }
    });
  }
}