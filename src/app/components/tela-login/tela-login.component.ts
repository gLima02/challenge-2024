import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/login-service.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
@Component({
  selector: 'app-tela-login',
  standalone: true,
  imports: [NgFor, CommonModule, RouterModule],
  templateUrl: './tela-login.component.html',
  styleUrl: './tela-login.component.css'
})
export class TelaLoginComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (data) => this.users = data,
      (error) => console.error('Error loading users:', error)
    );
  }

  onLogin(event: Event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const email = (event.target as HTMLFormElement).querySelector('#email') as HTMLInputElement;
    const password = (event.target as HTMLFormElement).querySelector('#password') as HTMLInputElement;

    const user = this.users.find(u => u.email === email.value && u.password === password.value);

    if (user) {
      if (user.role === 'admin') {
        console.log('login admin');

      } else if (user.role === 'collaborator') {
        console.log('login collaborator');

      }

      if (user.role === 'admin' || user.role === 'collaborator') {
        const alertDiv = document.querySelector('#alert-div') as HTMLElement
        alertDiv.remove()
        const firstName = user.firstName
        console.log(firstName)
        const eurofarmaImg = document.querySelector('#eurofarma') as HTMLElement;
        const loginCard = document.querySelector('.card') as HTMLElement;
        const welcomeText = document.querySelector('.welcome-text') as HTMLElement;
        welcomeText.innerHTML = `Olá, ${firstName}!<br />Bem-Vindo ao<br />novo OnBoarding!`
        const startBtn = document.querySelector('#start') as HTMLElement;

        // Adiciona as classes de animação aos elementos
        eurofarmaImg.classList.add('animate-slide-left');
        loginCard.classList.add('animate-fade-out');
        welcomeText.classList.add('animate-slide-in-right');


        // Redirecionar ou executar outra lógica após a animação, se necessário
        setTimeout(() => {
          startBtn.classList.add('animate-start')
          // Por exemplo, redirecionar para uma nova página ou mostrar uma nova view
        }, 2000); // Tempo deve coincidir com a duração das animações
      }
    } else {
      const alertDiv = document.querySelector('#alert-div') as HTMLElement
      const inputPassword = document.querySelector('#pass-div') as HTMLElement
      // inputPassword.innerHTML = ` <label for="password" class="form-label">Senha</label>
      //     <input
      //       type="password"
      //       class="form-control"
      //       id="password"
      //       placeholder="Digite sua senha"
      //       required
      //     />`
      alertDiv.innerHTML = `<div class="alert alert-danger" role="alert">
 Erro: Email ou senha inválidos
</div>`
      console.log('Erro: Usuário ou senha inválidos');
    }
  }
}