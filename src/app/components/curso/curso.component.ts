import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/login-service.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { TelaLoginComponent } from '../tela-login/tela-login.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [NavBarComponent, CommonModule, FormsModule, TelaLoginComponent, RouterModule],
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  role: string = '';
  editMode: { [key in 'title' | 'subtitle' | 'paragraph1' | 'paragraph2' | 'paragraph3' | 'paragraph4' | 'paragraph5' | 'paragraph6']: boolean } = {
    title: false,
    subtitle: false,
    paragraph1: false,
    paragraph2: false,
    paragraph3: false,
    paragraph4: false,
    paragraph5: false,
    paragraph6: false,
  };

  // Atributos para os textos editáveis
  title: string = '';
  subtitle: string = '';
  paragraph1: string = '';
  paragraph2: string = '';
  paragraph3: string = '';
  paragraph4: string = '';
  paragraph5: string = '';
  paragraph6: string = '';

  loggedInUserId: string | null = '';
  userCount: number = 0;

  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit() {
    // Recupera o ID do usuário logado
    this.userService.getLoggedInUserId().subscribe(userId => {
      this.loggedInUserId = userId;
      console.log('Logged in user ID:', userId);

      if (userId) {
        // Obtém os dados do usuário da API
        this.getUserData(userId);
      } else {
        console.error('User ID is null or undefined.');
      }
    });

    // Obtém a lista de usuários e conta o número total
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.userCount = users.length;
        console.log('Total de usuários:', this.userCount);
      },
      error: (err) => {
        console.error('Erro ao carregar usuários:', err);
      }
    });
  }

  getUserData(userId: string) {
    this.http.get(`http://localhost:3000/users/${userId}`).subscribe((user: any) => {
      this.role = user.role;
      
      // Acessa o primeiro curso (course1)
      const selectedCourse = user.courses.course1;
      if (selectedCourse) {
        this.title = selectedCourse.title;
        this.subtitle = selectedCourse.subtitle;
        
        // Acessa o primeiro módulo e seus parágrafos
        const module = selectedCourse.modules[0];
        if (module) {
          this.paragraph1 = module.paragraphs.paragraph1;
          this.paragraph2 = module.paragraphs.paragraph2;
          this.paragraph3 = module.paragraphs.paragraph3 || '';
          this.paragraph4 = module.paragraphs.paragraph4 || '';
          this.paragraph5 = module.paragraphs.paragraph5 || '';
          this.paragraph6 = module.paragraphs.paragraph6 || '';
        }
      }
    });
  }

  // Função para alternar entre os modos de edição e visualização
  toggleEdit(section: 'title' | 'subtitle' | 'paragraph1' | 'paragraph2' | 'paragraph3' | 'paragraph4' | 'paragraph5' | 'paragraph6') {
    this.editMode[section] = !this.editMode[section];
    if (!this.editMode[section]) {
      this.saveChanges();
    }
  }

  saveChanges() {
    const updatedUserData = {
      courses: {
        course1: {
          title: this.title,
          subtitle: this.subtitle,
          modules: [
            {
              paragraphs: {
                paragraph1: this.paragraph1,
                paragraph2: this.paragraph2,
                paragraph3: this.paragraph3,
                paragraph4: this.paragraph4,
                paragraph5: this.paragraph5,
                paragraph6: this.paragraph6,
              }
            }
          ]
        }
      }
    };

    // Atualiza os dados para todos os usuários
    for (let i = 1; i <= this.userCount; i++) {
      this.http.put(`http://localhost:3000/users/${i}`, updatedUserData).subscribe(() => {
        console.log('Alterações salvas com sucesso.');
      });
    }
  }

  answers = {
    q1: '',
    q2: '',
    q3: '',
    q4: ''
  };

  correctAnswers = {
    q1: 'b',
    q2: 'a',
    q3: 'a',
    q4: 'a'
  };

  isWrong = {
    q1: false,
    q2: false,
    q3: false,
    q4: false
  };

  resultMessage: string | null = null;

  checkAnswers() {
    let correctCount = 0;

    Object.keys(this.answers).forEach((key) => {
      const question = key as keyof typeof this.answers;
      if (this.answers[question] === this.correctAnswers[question]) {
        correctCount++;
        this.isWrong[question] = false;
      } else {
        this.isWrong[question] = true;
      }
    });

    this.resultMessage = `Você acertou ${correctCount} de 4 questões.`;
  }
}
