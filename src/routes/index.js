const express = require('express')
const router = new express.Router()

//npm install 

//ponto de acesso de get
//retornar statys de 200 ok 
router.get('/', (req, res, next)=> {
    res.status(200).send({
        "nome" : "Guilherme Lima"
    })
})
router.get('/privada', (req, res)=> {
    const token = req.headers['authorization'];

    if(!token || token !== 'minhaSenha'){
        return res.status(401).send('Sem autorizacao!')
    }
    res.send('Area acessada com sucesso!').status(200)
})

const tokenExemplos = {
    'tokenAdmin' : {role: 'admin'},
    'tokenUser' : {role: 'user'},
    'TokenConvidado' : {role: 'convidado'}
}

router.get('/admin', (req, res) => {
    const token = req.headers["authorization"]

    if(!token){
        return res.status(401).send('Sem autorizacao')
    }
    const user = tokenExemplos[token]
    if(!user){
        return res.status(401).send('Token invalido')
    }
    if(user.role != 'admin'){
        return res.status(403).send('Você nao tem permissao para acessar aqui')
    }

    return res.send('Acesso liberado!').status(200)
})

// exemplo bad request - 400
router.post('/submit', (req, res) => {
    const {nome, email} = req.body;

    if(!nome || !email){
        return res.status(400).send('Bad request, nome e email sao obrigatorios')
    }

    //status 202 created
    res.send('Dado criado com sucesso!').status(202);
})

let users = {
  users: [
    {   
      id: '1',
      role: 'admin',
      username: 'joseAdmin',
      password: '123',
      email: 'jose.admin@example.com',
      firstName: 'José',
      lastName: 'da Silva',
      fullName: 'José da Silva',
      permissions: ['read', 'write', 'delete'],
      courses: {
        course1: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          modules: [
            {
              moduleTitle: 'Introdução',
              paragraphs: {
                paragraph1: 'A Eurofarma é uma empresa comprometida com a excelência e integridade em todas as suas operações. Aspolíticasda empresa são fundamentais para garantir um ambiente de trabalho ético, seguro e produtivo para todos oscolaboradores.Este módulo oferece uma visão geral das principais políticas e diretrizes que regem nossas práticas diáriase interações profissionais. As políticas de conduta da Eurofarma estabelecem os padrões esperados de comportamento em todas as esferasda empresa.Os colaboradores são incentivados a atuar com transparência, respeito e honestidade em todas as suas ações.É imperativoque todos os membros da equipe compreendam e sigam essas diretrizes para promover um ambiente de trabalhopositivo e colaborativo.',
                paragraph2: 'A política de segurança no trabalho é uma das nossas principais prioridades. A Eurofarma se dedica afornecer um ambientede trabalho seguro, identificando e mitigando riscos e promovendo práticas de segurança robustas. Todos oscolaboradoresdevem estar cientes das normas de segurança e participar ativamente dos treinamentos oferecidos paragarantir a segurança de todos no ambiente de trabalho. Além das políticas de segurança, a Eurofarma também adota uma abordagem rigorosa para a proteção de dados einformações confidenciais.A empresa implementa medidas de segurança para proteger as informações sensíveis de clientes ecolaboradores, e todos os funcionáriosdevem seguir os procedimentos estabelecidos para garantir a confidencialidade e integridade dos dados.',
                paragraph3: 'A política de responsabilidade social da Eurofarma reflete nosso compromisso com a comunidade e o meioambiente. A empresa apoia diversasiniciativas de responsabilidade social e espera que todos os colaboradores se envolvam em projetos eatividades que promovam o bem-estarsocial e ambiental. O compromisso com práticas sustentáveis é essencial para nossa missão de promover um futuro melhor para todos.',
                paragraph4: 'Em resumo, as políticas da Eurofarma são projetadas para garantir que todos os colaboradores atuem com amais alta ética e responsabilidade,promovendo um ambiente de trabalho seguro, respeitoso e produtivo. Este módulo serve como uma introdução àsprincipais diretrizes e normasque devem ser seguidas e será o alicerce para os módulos seguintes que detalharão aspectos específicos daspolíticas da empresa. A compreensão e a adesão a essas políticas são cruciais para o sucesso e a integridade da Eurofarma, econtamos com o compromisso de todospara manter os mais altos padrões de conduta profissional e responsabilidade.',
                paragraph5: 'O compromisso da Eurofarma com a conformidade normativa, ou compliance, é um dos pilares fundamentais que sustenta nossas operações e reputação no mercado. A política de compliance da empresa abrange uma série de diretrizes que visam garantir que todas as atividades e práticas empresariais estejam em conformidade com as leis, regulamentos e normas aplicáveis, tanto em âmbito nacional quanto internacional. Nosso objetivo é assegurar que todos os colaboradores, fornecedores e parceiros comerciais compreendam e sigam os requisitos legais, éticos e regulamentares que regem o setor em que atuamos.',
                paragraph6: 'A transparência é um dos princípios norteadores da política de compliance da Eurofarma. Todas as nossas interações comerciais são pautadas pela integridade, com o objetivo de construir e manter uma relação de confiança com nossos stakeholders. Isso inclui a prestação de informações claras e completas a órgãos reguladores, acionistas, clientes e colaboradores, sempre respeitando as regras e regulamentos estabelecidos pelas autoridades competentes. Cada colaborador, independentemente do seu cargo ou função, é responsável por agir de maneira ética e em conformidade com as normas internas e externas.'
              }
            }
          ]
        },
        course2: {
          title: 'Código de Conduta Empresarial',
          subtitle: 'Módulo I | Introdução ao Código de Conduta',
          modules: [
            {
              moduleTitle: 'Módulo I - Conduta Profissional',
              paragraphs: {
                paragraph1: 'A Eurofarma é uma empresa comprometida com a excelência e integridade em todas as suas operações. Aspolíticasda empresa são fundamentais para garantir um ambiente de trabalho ético, seguro e produtivo para todos oscolaboradores.Este módulo oferece uma visão geral das principais políticas e diretrizes que regem nossas práticas diáriase interações profissionais. As políticas de conduta da Eurofarma estabelecem os padrões esperados de comportamento em todas as esferasda empresa.Os colaboradores são incentivados a atuar com transparência, respeito e honestidade em todas as suas ações.É imperativoque todos os membros da equipe compreendam e sigam essas diretrizes para promover um ambiente de trabalhopositivo e colaborativo.',
                paragraph2: 'A política de segurança no trabalho é uma das nossas principais prioridades. A Eurofarma se dedica afornecer um ambientede trabalho seguro, identificando e mitigando riscos e promovendo práticas de segurança robustas. Todos oscolaboradoresdevem estar cientes das normas de segurança e participar ativamente dos treinamentos oferecidos paragarantir a segurança de todos no ambiente de trabalho. Além das políticas de segurança, a Eurofarma também adota uma abordagem rigorosa para a proteção de dados einformações confidenciais.A empresa implementa medidas de segurança para proteger as informações sensíveis de clientes ecolaboradores, e todos os funcionáriosdevem seguir os procedimentos estabelecidos para garantir a confidencialidade e integridade dos dados.',
                paragraph3: 'A política de responsabilidade social da Eurofarma reflete nosso compromisso com a comunidade e o meioambiente. A empresa apoia diversasiniciativas de responsabilidade social e espera que todos os colaboradores se envolvam em projetos eatividades que promovam o bem-estarsocial e ambiental. O compromisso com práticas sustentáveis é essencial para nossa missão de promover um futuro melhor para todos.',
             }
            },
            {
              moduleTitle: 'Módulo II - Relações com Stakeholders',
              paragraphs: {
                paragraph1: 'A Eurofarma valoriza suas relações com stakeholders, pautadas por transparência e confiança mútua...',
                paragraph2: 'Manter uma comunicação clara e precisa com clientes e fornecedores é uma prioridade para garantir a integridade das relações...'
              }
            }
          ]
        },
        course3: {
          title: 'Treinamento de Segurança no Trabalho',
          subtitle: 'Módulo I | Segurança no Ambiente de Trabalho',
          modules: [
            {
              moduleTitle: 'Módulo I - Identificação de Riscos',
              paragraphs: {
                paragraph1: 'Identificar e mitigar riscos no ambiente de trabalho é essencial para a segurança de todos os colaboradores...',
                paragraph2: 'A Eurofarma adota práticas de segurança rigorosas e realiza treinamentos regulares para todos os funcionários...'
              }
            },
            {
              moduleTitle: 'Módulo II - Equipamentos de Proteção Individual (EPI)',
              paragraphs: {
                paragraph1: 'O uso adequado de Equipamentos de Proteção Individual (EPIs) é obrigatório em diversas áreas da empresa...',
                paragraph2: 'Todos os colaboradores devem estar familiarizados com os procedimentos de uso dos EPIs e seguir as diretrizes estabelecidas...'
              }
            }
          ]
        }
      }
    },
    {
      id: '2',
      role: 'admin',
      username: 'mariaSantos',
      password: '123',
      email: 'maria.santos@example.com',
      firstName: 'Maria',
      lastName: 'dos Santos',
      fullName: 'Maria dos Santos',
      permissions: ['read', 'write', 'delete'],
      courses: {
        course1: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          modules: [
            {
              moduleTitle: 'Introdução',
              paragraphs: {
                paragraph1: 'A Eurofarma é uma empresa comprometida com a excelência e integridade em todas as suas operações...',
                paragraph2: 'A política de segurança no trabalho é uma das nossas principais prioridades...',
                paragraph3: 'A política de responsabilidade social da Eurofarma reflete nosso compromisso...',
                paragraph4: 'Em resumo, as políticas da Eurofarma são projetadas para garantir que todos os colaboradores atuem...',
                paragraph5: 'O compromisso da Eurofarma com a conformidade normativa, ou compliance, é um dos pilares fundamentais...',
                paragraph6: 'A transparência é um dos princípios norteadores da política de compliance da Eurofarma...'
              }
            }
          ]
        },
        course2: {
          title: 'Código de Conduta Empresarial',
          subtitle: 'Módulo I | Introdução ao Código de Conduta',
          modules: [
            {
              moduleTitle: 'Módulo I - Conduta Profissional',
              paragraphs: {
                paragraph1: 'O Código de Conduta da Eurofarma estabelece os padrões de comportamento esperado de todos os colaboradores...',
                paragraph2: 'Todos os colaboradores devem atuar de forma ética e responsável em suas interações com colegas, clientes e fornecedores...'
              }
            },
            {
              moduleTitle: 'Módulo II - Relações com Stakeholders',
              paragraphs: {
                paragraph1: 'A Eurofarma valoriza suas relações com stakeholders, pautadas por transparência e confiança mútua...',
                paragraph2: 'Manter uma comunicação clara e precisa com clientes e fornecedores é uma prioridade para garantir a integridade das relações...'
              }
            }
          ]
        },
        course3: {
          title: 'Treinamento de Segurança no Trabalho',
          subtitle: 'Módulo I | Segurança no Ambiente de Trabalho',
          modules: [
            {
              moduleTitle: 'Módulo I - Identificação de Riscos',
              paragraphs: {
                paragraph1: 'Identificar e mitigar riscos no ambiente de trabalho é essencial para a segurança de todos os colaboradores...',
                paragraph2: 'A Eurofarma adota práticas de segurança rigorosas e realiza treinamentos regulares para todos os funcionários...'
              }
            },
            {
              moduleTitle: 'Módulo II - Equipamentos de Proteção Individual (EPI)',
              paragraphs: {
                paragraph1: 'O uso adequado de Equipamentos de Proteção Individual (EPIs) é obrigatório em diversas áreas da empresa...',
                paragraph2: 'Todos os colaboradores devem estar familiarizados com os procedimentos de uso dos EPIs e seguir as diretrizes estabelecidas...'
              }
            }
          ]
        }
      }
    },
    {
      id: '3',
      role: 'admin',
      username: 'pedroAlmeida',
      password: '123',
      email: 'pedro.almeida@example.com',
      firstName: 'Pedro',
      lastName: 'Almeida',
      fullName: 'Pedro Almeida',
      courses: {
        course1: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          modules: [
            {
              moduleTitle: 'Introdução',
              paragraphs: {
                paragraph1: 'A Eurofarma é uma empresa comprometida com a excelência e integridade em todas as suas operações...',
                paragraph2: 'A política de segurança no trabalho é uma das nossas principais prioridades...',
                paragraph3: 'A política de responsabilidade social da Eurofarma reflete nosso compromisso...',
                paragraph4: 'Em resumo, as políticas da Eurofarma são projetadas para garantir que todos os colaboradores atuem...',
                paragraph5: 'O compromisso da Eurofarma com a conformidade normativa, ou compliance, é um dos pilares fundamentais...',
                paragraph6: 'A transparência é um dos princípios norteadores da política de compliance da Eurofarma...'
              }
            }
          ]
        },
        course2: {
          title: 'Código de Conduta Empresarial',
          subtitle: 'Módulo I | Introdução ao Código de Conduta',
          modules: [
            {
              moduleTitle: 'Módulo I - Conduta Profissional',
              paragraphs: {
                paragraph1: 'O Código de Conduta da Eurofarma estabelece os padrões de comportamento esperado de todos os colaboradores...',
                paragraph2: 'Todos os colaboradores devem atuar de forma ética e responsável em suas interações com colegas, clientes e fornecedores...'
              }
            },
            {
              moduleTitle: 'Módulo II - Relações com Stakeholders',
              paragraphs: {
                paragraph1: 'A Eurofarma valoriza suas relações com stakeholders, pautadas por transparência e confiança mútua...',
                paragraph2: 'Manter uma comunicação clara e precisa com clientes e fornecedores é uma prioridade para garantir a integridade das relações...'
              }
            }
          ]
        },
        course3: {
          title: 'Treinamento de Segurança no Trabalho',
          subtitle: 'Módulo I | Segurança no Ambiente de Trabalho',
          modules: [
            {
              moduleTitle: 'Módulo I - Identificação de Riscos',
              paragraphs: {
                paragraph1: 'Identificar e mitigar riscos no ambiente de trabalho é essencial para a segurança de todos os colaboradores...',
                paragraph2: 'A Eurofarma adota práticas de segurança rigorosas e realiza treinamentos regulares para todos os funcionários...'
              }
            },
            {
              moduleTitle: 'Módulo II - Equipamentos de Proteção Individual (EPI)',
              paragraphs: {
                paragraph1: 'O uso adequado de Equipamentos de Proteção Individual (EPIs) é obrigatório em diversas áreas da empresa...',
                paragraph2: 'Todos os colaboradores devem estar familiarizados com os procedimentos de uso dos EPIs e seguir as diretrizes estabelecidas...'
              }
            }
          ]
        }
      }
    },
    {
      id: '4',
      role: 'collaborator',
      username: 'anaFernandes',
      password: '123',
      email: 'ana.fernandes@example.com',
      firstName: 'Ana',
      lastName: 'Fernandes',
      fullName: 'Ana Fernandes',
      permissions: ['read', 'write'],
      courses: {
        course1: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          modules: [
            {
              moduleTitle: 'Introdução',
              paragraphs: {
                paragraph1: 'A Eurofarma é uma empresa comprometida com a excelência e integridade em todas as suas operações...',
                paragraph2: 'A política de segurança no trabalho é uma das nossas principais prioridades...',
                paragraph3: 'A política de responsabilidade social da Eurofarma reflete nosso compromisso...',
                paragraph4: 'Em resumo, as políticas da Eurofarma são projetadas para garantir que todos os colaboradores atuem...',
                paragraph5: 'O compromisso da Eurofarma com a conformidade normativa, ou compliance, é um dos pilares fundamentais...',
                paragraph6: 'A transparência é um dos princípios norteadores da política de compliance da Eurofarma...'
              }
            }
          ]
        },
        course2: {
          title: 'Código de Conduta Empresarial',
          subtitle: 'Módulo I | Introdução ao Código de Conduta',
          modules: [
            {
              moduleTitle: 'Módulo I - Conduta Profissional',
              paragraphs: {
                paragraph1: 'O Código de Conduta da Eurofarma estabelece os padrões de comportamento esperado de todos os colaboradores...',
                paragraph2: 'Todos os colaboradores devem atuar de forma ética e responsável em suas interações com colegas, clientes e fornecedores...'
              }
            },
            {
              moduleTitle: 'Módulo II - Relações com Stakeholders',
              paragraphs: {
                paragraph1: 'A Eurofarma valoriza suas relações com stakeholders, pautadas por transparência e confiança mútua...',
                paragraph2: 'Manter uma comunicação clara e precisa com clientes e fornecedores é uma prioridade para garantir a integridade das relações...'
              }
            }
          ]
        },
        course3: {
          title: 'Treinamento de Segurança no Trabalho',
          subtitle: 'Módulo I | Segurança no Ambiente de Trabalho',
          modules: [
            {
              moduleTitle: 'Módulo I - Identificação de Riscos',
              paragraphs: {
                paragraph1: 'Identificar e mitigar riscos no ambiente de trabalho é essencial para a segurança de todos os colaboradores...',
                paragraph2: 'A Eurofarma adota práticas de segurança rigorosas e realiza treinamentos regulares para todos os funcionários...'
              }
            },
            {
              moduleTitle: 'Módulo II - Equipamentos de Proteção Individual (EPI)',
              paragraphs: {
                paragraph1: 'O uso adequado de Equipamentos de Proteção Individual (EPIs) é obrigatório em diversas áreas da empresa...',
                paragraph2: 'Todos os colaboradores devem estar familiarizados com os procedimentos de uso dos EPIs e seguir as diretrizes estabelecidas...'
              }
            }
          ]
        }
      }
    },
    {
      id: '5',
      role: 'collaborator',
      username: 'brunoLima',
      password: '123',
      email: 'bruno.lima@example.com',
      firstName: 'Bruno',
      lastName: 'Lima',
      fullName: 'Bruno Lima',
      permissions: ['read', 'write'],
      courses: {
        course1: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          modules: [
            {
              moduleTitle: 'Introdução',
              paragraphs: {
                paragraph1: 'A Eurofarma é uma empresa comprometida com a excelência e integridade em todas as suas operações...',
                paragraph2: 'A política de segurança no trabalho é uma das nossas principais prioridades...',
                paragraph3: 'A política de responsabilidade social da Eurofarma reflete nosso compromisso...',
                paragraph4: 'Em resumo, as políticas da Eurofarma são projetadas para garantir que todos os colaboradores atuem...',
                paragraph5: 'O compromisso da Eurofarma com a conformidade normativa, ou compliance, é um dos pilares fundamentais...',
                paragraph6: 'A transparência é um dos princípios norteadores da política de compliance da Eurofarma...'
              }
            }
          ]
        },
        course2: {
          title: 'Código de Conduta Empresarial',
          subtitle: 'Módulo I | Introdução ao Código de Conduta',
          modules: [
            {
              moduleTitle: 'Módulo I - Conduta Profissional',
              paragraphs: {
                paragraph1: 'O Código de Conduta da Eurofarma estabelece os padrões de comportamento esperado de todos os colaboradores...',
                paragraph2: 'Todos os colaboradores devem atuar de forma ética e responsável em suas interações com colegas, clientes e fornecedores...'
              }
            },
            {
              moduleTitle: 'Módulo II - Relações com Stakeholders',
              paragraphs: {
                paragraph1: 'A Eurofarma valoriza suas relações com stakeholders, pautadas por transparência e confiança mútua...',
                paragraph2: 'Manter uma comunicação clara e precisa com clientes e fornecedores é uma prioridade para garantir a integridade das relações...'
              }
            }
          ]
        },
        course3: {
          title: 'Treinamento de Segurança no Trabalho',
          subtitle: 'Módulo I | Segurança no Ambiente de Trabalho',
          modules: [
            {
              moduleTitle: 'Módulo I - Identificação de Riscos',
              paragraphs: {
                paragraph1: 'Identificar e mitigar riscos no ambiente de trabalho é essencial para a segurança de todos os colaboradores...',
                paragraph2: 'A Eurofarma adota práticas de segurança rigorosas e realiza treinamentos regulares para todos os funcionários...'
              }
            },
            {
              moduleTitle: 'Módulo II - Equipamentos de Proteção Individual (EPI)',
              paragraphs: {
                paragraph1: 'O uso adequado de Equipamentos de Proteção Individual (EPIs) é obrigatório em diversas áreas da empresa...',
                paragraph2: 'Todos os colaboradores devem estar familiarizados com os procedimentos de uso dos EPIs e seguir as diretrizes estabelecidas...'
              }
            }
          ]
        }
      }
    },
    {
      id: '6',
      role: 'collaborator',
      username: 'lucasCosta',
      password: '123',
      email: 'lucas.costa@example.com',
      firstName: 'Lucas',
      lastName: 'Costa',
      fullName: 'Lucas Costa',
      permissions: ['read', 'write'],
      courses: {
        course1: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          modules: [
            {
              moduleTitle: 'Introdução',
              paragraphs: {
                paragraph1: 'A Eurofarma é uma empresa comprometida com a excelência e integridade em todas as suas operações...',
                paragraph2: 'A política de segurança no trabalho é uma das nossas principais prioridades...',
                paragraph3: 'A política de responsabilidade social da Eurofarma reflete nosso compromisso...',
                paragraph4: 'Em resumo, as políticas da Eurofarma são projetadas para garantir que todos os colaboradores atuem...',
                paragraph5: 'O compromisso da Eurofarma com a conformidade normativa, ou compliance, é um dos pilares fundamentais...',
                paragraph6: 'A transparência é um dos princípios norteadores da política de compliance da Eurofarma...'
              }
            }
          ]
        },
        course2: {
          title: 'Código de Conduta Empresarial',
          subtitle: 'Módulo I | Introdução ao Código de Conduta',
          modules: [
            {
              moduleTitle: 'Módulo I - Conduta Profissional',
              paragraphs: {
                paragraph1: 'O Código de Conduta da Eurofarma estabelece os padrões de comportamento esperado de todos os colaboradores...',
                paragraph2: 'Todos os colaboradores devem atuar de forma ética e responsável em suas interações com colegas, clientes e fornecedores...'
              }
            },
            {
              moduleTitle: 'Módulo II - Relações com Stakeholders',
              paragraphs: {
                paragraph1: 'A Eurofarma valoriza suas relações com stakeholders, pautadas por transparência e confiança mútua...',
                paragraph2: 'Manter uma comunicação clara e precisa com clientes e fornecedores é uma prioridade para garantir a integridade das relações...'
              }
            }
          ]
        },
        course3: {
          title: 'Treinamento de Segurança no Trabalho',
          subtitle: 'Módulo I | Segurança no Ambiente de Trabalho',
          modules: [
            {
              moduleTitle: 'Módulo I - Identificação de Riscos',
              paragraphs: {
                paragraph1: 'Identificar e mitigar riscos no ambiente de trabalho é essencial para a segurança de todos os colaboradores...',
                paragraph2: 'A Eurofarma adota práticas de segurança rigorosas e realiza treinamentos regulares para todos os funcionários...'
              }
            },
            {
              moduleTitle: 'Módulo II - Equipamentos de Proteção Individual (EPI)',
              paragraphs: {
                paragraph1: 'O uso adequado de Equipamentos de Proteção Individual (EPIs) é obrigatório em diversas áreas da empresa...',
                paragraph2: 'Todos os colaboradores devem estar familiarizados com os procedimentos de uso dos EPIs e seguir as diretrizes estabelecidas...'
              }
            }
          ]
        }
      }
    },
    {
      id: '7',
      role: 'collaborator',
      username: 'claudiaOliveira',
      password: '123',
      email: 'claudia.oliveira@example.com',
      firstName: 'Cláudia',
      lastName: 'Oliveira',
      fullName: 'Cláudia Oliveira',
      permissions: ['read', 'write'],
      courses: {
        course1: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          modules: [
            {
              moduleTitle: 'Introdução',
              paragraphs: {
                paragraph1: 'A Eurofarma é uma empresa comprometida com a excelência e integridade em todas as suas operações...',
                paragraph2: 'A política de segurança no trabalho é uma das nossas principais prioridades...',
                paragraph3: 'A política de responsabilidade social da Eurofarma reflete nosso compromisso...',
                paragraph4: 'Em resumo, as políticas da Eurofarma são projetadas para garantir que todos os colaboradores atuem...',
                paragraph5: 'O compromisso da Eurofarma com a conformidade normativa, ou compliance, é um dos pilares fundamentais...',
                paragraph6: 'A transparência é um dos princípios norteadores da política de compliance da Eurofarma...'
              }
            }
          ]
        },
        course2: {
          title: 'Código de Conduta Empresarial',
          subtitle: 'Módulo I | Introdução ao Código de Conduta',
          modules: [
            {
              moduleTitle: 'Módulo I - Conduta Profissional',
              paragraphs: {
                paragraph1: 'O Código de Conduta da Eurofarma estabelece os padrões de comportamento esperado de todos os colaboradores...',
                paragraph2: 'Todos os colaboradores devem atuar de forma ética e responsável em suas interações com colegas, clientes e fornecedores...'
              }
            },
            {
              moduleTitle: 'Módulo II - Relações com Stakeholders',
              paragraphs: {
                paragraph1: 'A Eurofarma valoriza suas relações com stakeholders, pautadas por transparência e confiança mútua...',
                paragraph2: 'Manter uma comunicação clara e precisa com clientes e fornecedores é uma prioridade para garantir a integridade das relações...'
              }
            }
          ]
        },
        course3: {
          title: 'Treinamento de Segurança no Trabalho',
          subtitle: 'Módulo I | Segurança no Ambiente de Trabalho',
          modules: [
            {
              moduleTitle: 'Módulo I - Identificação de Riscos',
              paragraphs: {
                paragraph1: 'Identificar e mitigar riscos no ambiente de trabalho é essencial para a segurança de todos os colaboradores...',
                paragraph2: 'A Eurofarma adota práticas de segurança rigorosas e realiza treinamentos regulares para todos os funcionários...'
              }
            },
            {
              moduleTitle: 'Módulo II - Equipamentos de Proteção Individual (EPI)',
              paragraphs: {
                paragraph1: 'O uso adequado de Equipamentos de Proteção Individual (EPIs) é obrigatório em diversas áreas da empresa...',
                paragraph2: 'Todos os colaboradores devem estar familiarizados com os procedimentos de uso dos EPIs e seguir as diretrizes estabelecidas...'
              }
            }
          ]
        }
      }
    },
    {
      id: '8',
      role: 'collaborator',
      username: 'fabioSilva',
      password: '123',
      email: 'fabio.silva@example.com',
      firstName: 'Fábio',
      lastName: 'Silva',
      fullName: 'Fábio Silva',
      permissions: ['read', 'write'],
      courses: {
        course1: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          modules: [
            {
              moduleTitle: 'Introdução',
              paragraphs: {
                paragraph1: 'A Eurofarma é uma empresa comprometida com a excelência e integridade em todas as suas operações...',
                paragraph2: 'A política de segurança no trabalho é uma das nossas principais prioridades...',
                paragraph3: 'A política de responsabilidade social da Eurofarma reflete nosso compromisso...',
                paragraph4: 'Em resumo, as políticas da Eurofarma são projetadas para garantir que todos os colaboradores atuem...',
                paragraph5: 'O compromisso da Eurofarma com a conformidade normativa, ou compliance, é um dos pilares fundamentais...',
                paragraph6: 'A transparência é um dos princípios norteadores da política de compliance da Eurofarma...'
              }
            }
          ]
        },
        course2: {
          title: 'Código de Conduta Empresarial',
          subtitle: 'Módulo I | Introdução ao Código de Conduta',
          modules: [
            {
              moduleTitle: 'Módulo I - Conduta Profissional',
              paragraphs: {
                paragraph1: 'O Código de Conduta da Eurofarma estabelece os padrões de comportamento esperado de todos os colaboradores...',
                paragraph2: 'Todos os colaboradores devem atuar de forma ética e responsável em suas interações com colegas, clientes e fornecedores...'
              }
            },
            {
              moduleTitle: 'Módulo II - Relações com Stakeholders',
              paragraphs: {
                paragraph1: 'A Eurofarma valoriza suas relações com stakeholders, pautadas por transparência e confiança mútua...',
                paragraph2: 'Manter uma comunicação clara e precisa com clientes e fornecedores é uma prioridade para garantir a integridade das relações...'
              }
            }
          ]
        },
        course3: {
          title: 'Treinamento de Segurança no Trabalho',
          subtitle: 'Módulo I | Segurança no Ambiente de Trabalho',
          modules: [
            {
              moduleTitle: 'Módulo I - Identificação de Riscos',
              paragraphs: {
                paragraph1: 'Identificar e mitigar riscos no ambiente de trabalho é essencial para a segurança de todos os colaboradores...',
                paragraph2: 'A Eurofarma adota práticas de segurança rigorosas e realiza treinamentos regulares para todos os funcionários...'
              }
            },
            {
              moduleTitle: 'Módulo II - Equipamentos de Proteção Individual (EPI)',
              paragraphs: {
                paragraph1: 'O uso adequado de Equipamentos de Proteção Individual (EPIs) é obrigatório em diversas áreas da empresa...',
                paragraph2: 'Todos os colaboradores devem estar familiarizados com os procedimentos de uso dos EPIs e seguir as diretrizes estabelecidas...'
              }
            }
          ]
        }
      }
    },
    {
      id: '9',
      role: 'collaborator',
      username: 'renataPereira',
      password: '123',
      email: 'renata.pereira@example.com',
      firstName: 'Renata',
      lastName: 'Pereira',
      fullName: 'Renata Pereira',
      permissions: ['read', 'write'],
      courses: {
        course1: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          modules: [
            {
              moduleTitle: 'Introdução',
              paragraphs: {
                paragraph1: 'A Eurofarma é uma empresa comprometida com a excelência e integridade em todas as suas operações...',
                paragraph2: 'A política de segurança no trabalho é uma das nossas principais prioridades...',
                paragraph3: 'A política de responsabilidade social da Eurofarma reflete nosso compromisso...',
                paragraph4: 'Em resumo, as políticas da Eurofarma são projetadas para garantir que todos os colaboradores atuem...',
                paragraph5: 'O compromisso da Eurofarma com a conformidade normativa, ou compliance, é um dos pilares fundamentais...',
                paragraph6: 'A transparência é um dos princípios norteadores da política de compliance da Eurofarma...'
              }
            }
          ]
        },
        course2: {
          title: 'Código de Conduta Empresarial',
          subtitle: 'Módulo I | Introdução ao Código de Conduta',
          modules: [
            {
              moduleTitle: 'Módulo I - Conduta Profissional',
              paragraphs: {
                paragraph1: 'O Código de Conduta da Eurofarma estabelece os padrões de comportamento esperado de todos os colaboradores...',
                paragraph2: 'Todos os colaboradores devem atuar de forma ética e responsável em suas interações com colegas, clientes e fornecedores...'
              }
            },
            {
              moduleTitle: 'Módulo II - Relações com Stakeholders',
              paragraphs: {
                paragraph1: 'A Eurofarma valoriza suas relações com stakeholders, pautadas por transparência e confiança mútua...',
                paragraph2: 'Manter uma comunicação clara e precisa com clientes e fornecedores é uma prioridade para garantir a integridade das relações...'
              }
            }
          ]
        },
        course3: {
          title: 'Treinamento de Segurança no Trabalho',
          subtitle: 'Módulo I | Segurança no Ambiente de Trabalho',
          modules: [
            {
              moduleTitle: 'Módulo I - Identificação de Riscos',
              paragraphs: {
                paragraph1: 'Identificar e mitigar riscos no ambiente de trabalho é essencial para a segurança de todos os colaboradores...',
                paragraph2: 'A Eurofarma adota práticas de segurança rigorosas e realiza treinamentos regulares para todos os funcionários...'
              }
            },
            {
              moduleTitle: 'Módulo II - Equipamentos de Proteção Individual (EPI)',
              paragraphs: {
                paragraph1: 'O uso adequado de Equipamentos de Proteção Individual (EPIs) é obrigatório em diversas áreas da empresa...',
                paragraph2: 'Todos os colaboradores devem estar familiarizados com os procedimentos de uso dos EPIs e seguir as diretrizes estabelecidas...'
              }
            }
          ]
        }
      }
    },
    {
      id: '10',
      role: 'collaborator',
      username: 'marceloSouza',
      password: '123',
      email: 'marcelo.souza@example.com',
      firstName: 'Marcelo',
      lastName: 'Souza',
      fullName: 'Marcelo Souza',
      permissions: ['read', 'write'],
      courses: {
        course1: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          modules: [
            {
              moduleTitle: 'Introdução',
              paragraphs: {
                paragraph1: 'A Eurofarma é uma empresa comprometida com a excelência e integridade em todas as suas operações...',
                paragraph2: 'A política de segurança no trabalho é uma das nossas principais prioridades...',
                paragraph3: 'A política de responsabilidade social da Eurofarma reflete nosso compromisso...',
                paragraph4: 'Em resumo, as políticas da Eurofarma são projetadas para garantir que todos os colaboradores atuem...',
                paragraph5: 'O compromisso da Eurofarma com a conformidade normativa, ou compliance, é um dos pilares fundamentais...',
                paragraph6: 'A transparência é um dos princípios norteadores da política de compliance da Eurofarma...'
              }
            }
          ]
        },
        course2: {
          title: 'Código de Conduta Empresarial',
          subtitle: 'Módulo I | Introdução ao Código de Conduta',
          modules: [
            {
              moduleTitle: 'Módulo I - Conduta Profissional',
              paragraphs: {
                paragraph1: 'O Código de Conduta da Eurofarma estabelece os padrões de comportamento esperado de todos os colaboradores...',
                paragraph2: 'Todos os colaboradores devem atuar de forma ética e responsável em suas interações com colegas, clientes e fornecedores...'
              }
            },
            {
              moduleTitle: 'Módulo II - Relações com Stakeholders',
              paragraphs: {
                paragraph1: 'A Eurofarma valoriza suas relações com stakeholders, pautadas por transparência e confiança mútua...',
                paragraph2: 'Manter uma comunicação clara e precisa com clientes e fornecedores é uma prioridade para garantir a integridade das relações...'
              }
            }
          ]
        },
        course3: {
          title: 'Treinamento de Segurança no Trabalho',
          subtitle: 'Módulo I | Segurança no Ambiente de Trabalho',
          modules: [
            {
              moduleTitle: 'Módulo I - Identificação de Riscos',
              paragraphs: {
                paragraph1: 'Identificar e mitigar riscos no ambiente de trabalho é essencial para a segurança de todos os colaboradores...',
                paragraph2: 'A Eurofarma adota práticas de segurança rigorosas e realiza treinamentos regulares para todos os funcionários...'
              }
            },
            {
              moduleTitle: 'Módulo II - Equipamentos de Proteção Individual (EPI)',
              paragraphs: {
                paragraph1: 'O uso adequado de Equipamentos de Proteção Individual (EPIs) é obrigatório em diversas áreas da empresa...',
                paragraph2: 'Todos os colaboradores devem estar familiarizados com os procedimentos de uso dos EPIs e seguir as diretrizes estabelecidas...'
              }
            }
          ]
        }
      }
    }
  ]
};

router.get('/users', (req, res) => {
  res.status(200).send(users);
});

router.get('/users/:id', (req, res) => {
  const id = req.params.id;

  const user = users.users.find(item => item.id === id);

  if (user) {
      return res.status(200).send(user);
  } else {
      return res.status(404).send('Item não encontrado');
  }
});

// Rota para adicionar um novo item
router.post('/users', (req, res) => {
  const { id, role, username, courses } = req.body;

  if (!id || !role || !username || !courses) {
      return res.status(400).send('Bad request, todos os campos são obrigatórios.');
  }

  const newItem = { id, role, username, courses };
  users.users.push(newItem); // Adiciona o novo item ao array

  res.status(201).send(newItem); // Retorna o item criado
});

// Rota para atualizar um item existente (Update)
router.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const index = users.users.findIndex(item => item.id === id);

  if (index === -1) {
      return res.status(404).send('Item não encontrado');
  }

  const updatedItem = {
      ...users.users[index],
      ...req.body
  };

  users.users[index] = updatedItem;

  res.status(200).send(updatedItem);
});

// Rota para excluir um item existente (Delete)
router.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  const index = users.users.findIndex(item => item.id === id);

  if (index === -1) {
      return res.status(404).send('Item não encontrado');
  }

  users.users.splice(index, 1); // Remove o item do array

  res.status(204).send(); // Retorna status 204 (No Content) para exclusão bem-sucedida
});
module.exports = router;