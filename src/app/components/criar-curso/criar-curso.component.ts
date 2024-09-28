import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-criar-curso',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './criar-curso.component.html',
  styleUrls: ['./criar-curso.component.css']  // Corrigido para 'styleUrls'
})
export class CriarCursoComponent {
  isCreating: boolean = false;
  nroQuestao: number = 0;


  criarParagrafo() {
    if (!this.isCreating) {
      this.isCreating = true;
      console.log('Criando parágrafo');

      const divParagrafos = document.getElementById('paragrafos');
      const divCriados = document.getElementById('criados');

      if (divParagrafos && divCriados) {
        // Criando um novo elemento textarea
        const textarea = document.createElement('textarea');
        textarea.setAttribute('rows', '4');
        textarea.setAttribute('cols', '50');
        textarea.classList.add('rounded');
        textarea.style.width = '100%';
        textarea.setAttribute('placeholder', 'Digite aqui o conteúdo do parágrafo...');

        // Adicionando o textarea à divParagrafos
        divParagrafos.appendChild(textarea);

        // Criando o botão Criar
        const btnCriar = document.createElement('button');
        btnCriar.classList.add('btn', 'border-main', 'text-main', 'm-1', 'fs-3');
        btnCriar.innerHTML = 'Criar';

        // Evento de clique para o botão Criar
        btnCriar.addEventListener('click', () => {
          const texto = textarea.value;

          if (texto.trim()) {
            // Criar um novo parágrafo com o texto do textarea
            const p = document.createElement('h5');
            p.style.display = 'flex';
            p.style.justifyContent = 'space-between';
            p.style.alignItems = 'center';
            p.innerHTML = texto;

            // Criando o botão Apagar
            const btnApagar = document.createElement('button');
            btnApagar.classList.add('btn', 'border-main', 'text-main', 'm-1', 'fs-3');
            btnApagar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>`;

            // Evento de clique para o botão Apagar
            btnApagar.addEventListener('click', () => {
              divCriados.removeChild(p);  // Remove o parágrafo ao clicar em "Apagar"
            });

            // Adiciona o botão Apagar ao parágrafo
            p.appendChild(btnApagar);

            // Adiciona o parágrafo completo na div 'criados'
            divCriados.appendChild(p);

            // Limpa a div de criação e reseta o estado
            divParagrafos.innerHTML = '';
            this.isCreating = false;
          }
        });

        // Criando o botão Cancelar
        const btnCancelar = document.createElement('button');
        btnCancelar.classList.add('btn', 'border-main', 'text-main', 'm-1', 'fs-3');
        btnCancelar.innerHTML = 'Cancelar';

        // Evento de clique para o botão Cancelar
        btnCancelar.addEventListener('click', () => {
          divParagrafos.innerHTML = '';  // Limpa a div de criação
          this.isCreating = false;  // Permite criar novamente
        });

        // Adicionando os botões à divParagrafos
        divParagrafos.appendChild(btnCriar);
        divParagrafos.appendChild(btnCancelar);
      }
    }
  }

  criarQuestionario() {
    if (!this.isCreating) {
      this.isCreating = true;

      const divParagrafos = document.getElementById('paragrafos');
      const divCriados = document.getElementById('criados');

      if (divParagrafos && divCriados) {
        // Criando um campo para o título da questão
        const inputTitulo = document.createElement('input');
        inputTitulo.setAttribute('type', 'text');
        inputTitulo.setAttribute('placeholder', 'Digite o título da questão...');
        inputTitulo.classList.add('form-control', 'mb-3', 'fs-4');
        divParagrafos.appendChild(inputTitulo);

        // Criando campos para as 5 alternativas
        const alternativas: HTMLInputElement[] = [];
        for (let i = 1; i <= 5; i++) {
          const inputAlternativa = document.createElement('input');
          inputAlternativa.setAttribute('type', 'text');
          inputAlternativa.setAttribute('placeholder', `Digite a alternativa ${i}`);
          inputAlternativa.classList.add('form-control', 'mb-2');
          alternativas.push(inputAlternativa);
          divParagrafos.appendChild(inputAlternativa);
        }

        // Criando o botão Criar
        const btnCriar = document.createElement('button');
        btnCriar.classList.add('btn', 'border-main', 'text-main', 'm-1', 'fs-3');
        btnCriar.innerHTML = 'Criar';

        // Evento de clique para o botão Criar
        btnCriar.addEventListener('click', () => {
          const titulo = inputTitulo.value;
          const opcoes = alternativas.map(input => input.value).filter(opcao => opcao.trim() !== '');

          if (titulo.trim() && opcoes.length === 5) {
            this.nroQuestao += 1
            const numeroQuestao = this.nroQuestao;  // Número da questão

            // Criando o container da questão
            const divQuestao = document.createElement('div');
            divQuestao.classList.add('row', 'mb-3');
            divQuestao.style.display = 'flex';
            divQuestao.style.justifyContent = 'space-between';
            divQuestao.style.alignItems = 'center';

            // Criando o label da questão
            const label = document.createElement('label');
            label.classList.add('col-sm-12', 'col-md-4', 'col-form-label');
            label.setAttribute('for', `q${numeroQuestao}`);
            label.innerHTML = `${numeroQuestao}. ${titulo}`;
            divQuestao.appendChild(label);

            // Criando o select com as opções
            const divSelect = document.createElement('div');
            divSelect.classList.add('col-sm-12', 'col-md-8');

            const select = document.createElement('select');
            select.classList.add('form-select');
            select.setAttribute('id', `q${numeroQuestao}`);
            select.setAttribute('name', `q${numeroQuestao}`);
            select.required = true;

            // Adicionando a opção padrão
            const optionDefault = document.createElement('option');
            optionDefault.value = '';
            optionDefault.disabled = true;
            optionDefault.selected = true;
            optionDefault.innerHTML = 'Selecione uma opção';
            select.appendChild(optionDefault);

            // Adicionando as alternativas
            ['a', 'b', 'c', 'd', 'e'].forEach((letra, index) => {
              const option = document.createElement('option');
              option.value = letra;
              option.innerHTML = opcoes[index];
              select.appendChild(option);
            });

            divSelect.appendChild(select);
            divQuestao.appendChild(divSelect);

            // Criando o botão Apagar
            const btnApagar = document.createElement('button');
            btnApagar.classList.add('btn', 'border-main', 'text-main', 'm-1', 'fs-3');
            btnApagar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>`;

            // Evento de clique para o botão Apagar
            btnApagar.addEventListener('click', () => {
              divCriados.removeChild(divQuestao);  // Remove a questão ao clicar em "Apagar"
            });

            // Adiciona o botão Apagar ao final do divQuestao
            divQuestao.appendChild(btnApagar);

            // Adiciona a questão completa na div 'criados'
            divCriados.appendChild(divQuestao);

            // Limpa a div de criação e reseta o estado
            divParagrafos.innerHTML = '';
            this.isCreating = false;
          } else {
            alert('Preencha o título e todas as 5 alternativas.');
          }
        });

        // Criando o botão Cancelar
        const btnCancelar = document.createElement('button');
        btnCancelar.classList.add('btn', 'border-main', 'text-main', 'm-1', 'fs-3');
        btnCancelar.innerHTML = 'Cancelar';

        // Evento de clique para o botão Cancelar
        btnCancelar.addEventListener('click', () => {
          divParagrafos.innerHTML = '';  // Limpa a div de criação
          this.isCreating = false;  // Permite criar novamente
        });

        // Adicionando os botões à divParagrafos
        divParagrafos.appendChild(btnCriar);
        divParagrafos.appendChild(btnCancelar);
      }
    }
  }
}
