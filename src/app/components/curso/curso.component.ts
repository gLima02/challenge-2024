import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/login-service.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { TelaLoginComponent } from '../tela-login/tela-login.component';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [NavBarComponent, CommonModule, FormsModule, TelaLoginComponent, RouterModule],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css'
})
export class CursoComponent implements OnInit {

  role: string = ''; // Armazena a role do usuário
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

  // Exemplo de textos editáveis
  subtitle = 'Módulo I | Introdução às Políticas da Eurofarma';
  title = 'Políticas da Empresa Eurofarma';
  paragraph1 = 'A Eurofarma é uma empresa comprometida com a excelência e integridade em todas as suas operações. Aspolíticasda empresa são fundamentais para garantir um ambiente de trabalho ético, seguro e produtivo para todos oscolaboradores.Este módulo oferece uma visão geral das principais políticas e diretrizes que regem nossas práticas diáriase interações profissionais. As políticas de conduta da Eurofarma estabelecem os padrões esperados de comportamento em todas as esferasda empresa.Os colaboradores são incentivados a atuar com transparência, respeito e honestidade em todas as suas ações.É imperativoque todos os membros da equipe compreendam e sigam essas diretrizes para promover um ambiente de trabalhopositivo e colaborativo.';
  paragraph2 = 'A política de segurança no trabalho é uma das nossas principais prioridades. A Eurofarma se dedica afornecer um ambientede trabalho seguro, identificando e mitigando riscos e promovendo práticas de segurança robustas. Todos oscolaboradoresdevem estar cientes das normas de segurança e participar ativamente dos treinamentos oferecidos paragarantir a segurança de todos no ambiente de trabalho. Além das políticas de segurança, a Eurofarma também adota uma abordagem rigorosa para a proteção de dados einformações confidenciais.A empresa implementa medidas de segurança para proteger as informações sensíveis de clientes ecolaboradores, e todos os funcionáriosdevem seguir os procedimentos estabelecidos para garantir a confidencialidade e integridade dos dados.';
  paragraph3 = 'A política de responsabilidade social da Eurofarma reflete nosso compromisso com a comunidade e o meioambiente. A empresa apoia diversasiniciativas de responsabilidade social e espera que todos os colaboradores se envolvam em projetos eatividades que promovam o bem-estarsocial e ambiental. O compromisso com práticas sustentáveis é essencial para nossa missão de promover um futuro melhor para todos.';
  paragraph4 = 'Em resumo, as políticas da Eurofarma são projetadas para garantir que todos os colaboradores atuem com amais alta ética e responsabilidade,promovendo um ambiente de trabalho seguro, respeitoso e produtivo. Este módulo serve como uma introdução àsprincipais diretrizes e normasque devem ser seguidas e será o alicerce para os módulos seguintes que detalharão aspectos específicos daspolíticas da empresa. A compreensão e a adesão a essas políticas são cruciais para o sucesso e a integridade da Eurofarma, econtamos com o compromisso de todospara manter os mais altos padrões de conduta profissional e responsabilidade.';
  paragraph5 = 'O compromisso da Eurofarma com a conformidade normativa, ou compliance, é um dos pilares fundamentais que sustenta nossas operações e reputação no mercado. A política de compliance da empresa abrange uma série de diretrizes que visam garantir que todas as atividades e práticas empresariais estejam em conformidade com as leis, regulamentos e normas aplicáveis, tanto em âmbito nacional quanto internacional. Nosso objetivo é assegurar que todos os colaboradores, fornecedores e parceiros comerciais compreendam e sigam os requisitos legais, éticos e regulamentares que regem o setor em que atuamos.';
  paragraph6 = 'A transparência é um dos princípios norteadores da política de compliance da Eurofarma. Todas as nossas interações comerciais são pautadas pela integridade, com o objetivo de construir e manter uma relação de confiança com nossos stakeholders. Isso inclui a prestação de informações claras e completas a órgãos reguladores, acionistas, clientes e colaboradores, sempre respeitando as regras e regulamentos estabelecidos pelas autoridades competentes. Cada colaborador, independentemente do seu cargo ou função, é responsável por agir de maneira ética e em conformidade com as normas internas e externas.';

  constructor(private userService: UserService) { }

  loggedInUserId: string | null = '';

  ngOnInit() {
    // Recupera o ID do usuário logado
    this.userService.getLoggedInUserId().subscribe(userId => {
      this.loggedInUserId = userId;
      console.log('Logged in user ID:', userId);

      // Após obter o userId, recupera a role do usuário
      this.userService.getUserRole(userId).subscribe(role => {
        this.role = role; // Armazena a role do usuário
        console.log('Role do usuário:', role);
      });
    });
  }

  // Função para alternar entre os modos de edição e visualização
  toggleEdit(section: 'title' | 'subtitle' | 'paragraph1' | 'paragraph2' | 'paragraph3' | 'paragraph4' | 'paragraph5' | 'paragraph6') {
    this.editMode[section] = !this.editMode[section];
    if (!this.editMode[section]) {
      // Lógica para "salvar" alterações localmente, se necessário
      this.saveChanges(section);
    }
  }

  // Função para salvar as mudanças locais
  saveChanges(section: 'title' | 'subtitle' | 'paragraph1' | 'paragraph2' | 'paragraph3' | 'paragraph4' | 'paragraph5' | 'paragraph6') {
    console.log(`Alterações na seção ${section} foram salvas localmente.`);
    // Aqui você pode adicionar lógica para salvar as alterações permanentemente (ex: API)
  }
}
