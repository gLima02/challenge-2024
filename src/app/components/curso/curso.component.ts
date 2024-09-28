import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/login-service.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { TelaLoginComponent } from '../tela-login/tela-login.component';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient para requisições HTTP

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
        // Aqui você pode adicionar lógica para lidar com o caso de userId ser nulo
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

    // Faz uma requisição PUT para atualizar os dados do usuário na API
    this.http.put(`http://localhost:3000/users/${this.loggedInUserId}`, updatedUserData).subscribe(() => {
      console.log('Alterações salvas com sucesso.');
    });
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

  resultMessage: string | null = null;

  checkAnswers() {
    let correctCount = 0;

    Object.keys(this.answers).forEach((key) => {
      if (this.answers[key as keyof typeof this.answers] === this.correctAnswers[key as keyof typeof this.correctAnswers]) {
        correctCount++;
      }
    });

    this.resultMessage = `Você acertou ${correctCount} de 4 questões.`;
  }
}
