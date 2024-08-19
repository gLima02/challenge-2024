import { Component, } from '@angular/core';

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
    
    // Adiciona as classes de animação aos elementos
    const eurofarmaImg = document.querySelector('#eurofarma') as HTMLElement;
    const loginCard = document.querySelector('.card') as HTMLElement;
    const welcomeText = document.querySelector('.welcome-text') as HTMLElement;

    if (eurofarmaImg) {
      eurofarmaImg.classList.add('animate-slide-left');
    }

    if (loginCard) {
      loginCard.classList.add('animate-fade-out');
    }

    if (welcomeText) {
      welcomeText.classList.add('animate-slide-in-right');
    }

    // Redirecionar ou executar outra lógica após a animação, se necessário
    setTimeout(() => {
      // Por exemplo, redirecionar para uma nova página ou mostrar uma nova view
    }, 1000); // Tempo deve coincidir com a duração das animações
  }
}
