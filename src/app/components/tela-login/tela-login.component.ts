import { Component } from '@angular/core';

@Component({
  selector: 'app-tela-login',
  standalone: true,
  imports: [],
  templateUrl: './tela-login.component.html',
  styleUrl: './tela-login.component.css'
})
export class TelaLoginComponent {

  onLoginClick(event: Event): void {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const eurofarmaImg = document.querySelector('#eurofarma') as HTMLElement;
    const loginCard = document.querySelector('.card') as HTMLElement;
    const welcomeText = document.querySelector('.welcome-text') as HTMLElement;
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
}
