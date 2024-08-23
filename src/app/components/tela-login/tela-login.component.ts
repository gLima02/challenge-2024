import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/login-service.service';
import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'app-tela-login',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './tela-login.component.html',
  styleUrl: './tela-login.component.css'
})
export class TelaLoginComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

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
    } else {
      console.log('Usuário ou senha inválidos');
    }
  }
}
