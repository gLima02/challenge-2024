import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/login-service.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { TelaLoginComponent } from '../tela-login/tela-login.component';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient para requisições HTTP
import { Observable } from 'rxjs';

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
  userCount: number = 0; // Para armazenar o número total de usuários

  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit() {
    // Recupera o ID do usuário logado
    this.userService.getLoggedInUserId().subscribe(userId => {
      this.loggedInUserId = userId;
      console.log('Logged in user ID:', userId);

      // Verifica se userId não é null antes de chamar getUserData
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
        this.userCount = users.length; // Armazena o número de usuários
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
      this.title = user.courses.title;
      this.subtitle = user.courses.subtitle;
      this.paragraph1 = user.courses.paragraphs.paragraph1;
      this.paragraph2 = user.courses.paragraphs.paragraph2;
      this.paragraph3 = user.courses.paragraphs.paragraph3 || '';
      this.paragraph4 = user.courses.paragraphs.paragraph4 || '';
      this.paragraph5 = user.courses.paragraphs.paragraph5 || '';
      this.paragraph6 = user.courses.paragraphs.paragraph6 || '';
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
        title: this.title,
        subtitle: this.subtitle,
        paragraphs: {
          paragraph1: this.paragraph1,
          paragraph2: this.paragraph2,
          paragraph3: this.paragraph3,
          paragraph4: this.paragraph4,
          paragraph5: this.paragraph5,
          paragraph6: this.paragraph6,
        }
      }
    };

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

  // Respostas corretas
  correctAnswers = {
    q1: 'b',
    q2: 'a',
    q3: 'a',
    q4: 'a'
  };

    // Estado para verificar se a resposta está errada
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
        this.isWrong[question] = false; // Resposta correta, remove o erro
      } else {
        this.isWrong[question] = true; // Marca como incorreta
      }
    });

    this.resultMessage = `Você acertou ${correctCount} de 4 questões.`;
  }
}

