import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../../services/login-service.service';
@Component({
  selector: 'app-tela-login',
  standalone: true,
  imports: [NgFor, CommonModule, RouterModule],
  templateUrl: './tela-login.component.html',
  styleUrl: './tela-login.component.css'
})

export class TelaLoginComponent implements OnInit {
  loggedInUserId = new BehaviorSubject<string | null>(null);
  setLoggedInUserId(userId: string): void {
    this.loggedInUserId.next(userId);
  }

  getLoggedInUserId() {
    return this.loggedInUserId.asObservable();
  }

  private loggedInUserName = new BehaviorSubject<string | null>(null);
  setLoggedInUserName(userName: string): void {
    this.loggedInUserName.next(userName);
  }
  getLoggedInUserName() {
    return this.loggedInUserName.asObservable();
  }

  users: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    const html = document.querySelector('html') as HTMLElement
    html.style.overflow = 'hidden'
    this.userService.getUsers().subscribe(
      (data) => this.users = data,
      (error) => console.error('Error loading users:', error)
    );
  }

  userId: Number = 0;


  onLogin(event: Event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const email = (event.target as HTMLFormElement).querySelector('#email') as HTMLInputElement;
    const password = (event.target as HTMLFormElement).querySelector('#password') as HTMLInputElement;

    const user = this.users.find(u => u.email === email.value && u.password === password.value);
    this.setLoggedInUserId(user.id);
    this.setLoggedInUserName(user.firstname)



    if (user) {

      if (user.role === 'admin') {
        console.log('login admin');

      } else if (user.role === 'collaborator') {
        console.log('login collaborator');

      }

      if (user.role === 'admin' || user.role === 'collaborator') {
        const alertDiv = document.querySelector('#alert-div') as HTMLElement
        alertDiv.remove()
        this.userId = user.id
        console.log(user.id)
        this.userService.setLoggedInUserId(user.id.toString());
        this.userService.setLoggedInUserName(user.firstName.toString());
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
