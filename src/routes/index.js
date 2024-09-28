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

let items = [
    {
        id: '1',
        role: 'admin',
        username: 'joseAdmin',
        courses: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          paragraphs: {
            paragraph1: 'Texto do primeiro parágrafo...',
            paragraph2: 'Texto do segundo parágrafo...'
          }
        }
      },
      {
        id: '2',
        role: 'admin',
        username: 'mariaSantos',
        courses: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          paragraphs: {
            paragraph1: 'Texto do primeiro parágrafo...',
            paragraph2: 'Texto do segundo parágrafo...'
          }
        }
      },
      {
        id: '3',
        role: 'admin',
        username: 'pedroAlmeida',
        courses: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          paragraphs: {
            paragraph1: 'Texto do primeiro parágrafo...',
            paragraph2: 'Texto do segundo parágrafo...'
          }
        }
      },
      {
        id: '4',
        role: 'collaborator',
        username: 'anaFernandes',
        courses: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          paragraphs: {
            paragraph1: 'Texto do primeiro parágrafo...',
            paragraph2: 'Texto do segundo parágrafo...'
          }
        }
      },
      {
        id: '5',
        role: 'collaborator',
        username: 'brunoLima',
        courses: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          paragraphs: {
            paragraph1: 'Texto do primeiro parágrafo...',
            paragraph2: 'Texto do segundo parágrafo...'
          }
        }
      },
      {
        id: '6',
        role: 'collaborator',
        username: 'lucasCosta',
        courses: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          paragraphs: {
            paragraph1: 'Texto do primeiro parágrafo...',
            paragraph2: 'Texto do segundo parágrafo...'
          }
        }
      },
      {
        id: '7',
        role: 'collaborator',
        username: 'claudiaOliveira',
        courses: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          paragraphs: {
            paragraph1: 'Texto do primeiro parágrafo...',
            paragraph2: 'Texto do segundo parágrafo...'
          }
        }
      },
      {
        id: '8',
        role: 'collaborator',
        username: 'fabioSilva',
        courses: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          paragraphs: {
            paragraph1: 'Texto do primeiro parágrafo...',
            paragraph2: 'Texto do segundo parágrafo...'
          }
        }
      },
      {
        id: '9',
        role: 'collaborator',
        username: 'renataPereira',
        courses: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          paragraphs: {
            paragraph1: 'Texto do primeiro parágrafo...',
            paragraph2: 'Texto do segundo parágrafo...'
          }
        }
      },
      {
        id: '10',
        role: 'collaborator',
        username: 'marceloSouza',
        courses: {
          title: 'Políticas da Empresa Eurofarma',
          subtitle: 'Módulo I | Introdução às Políticas da Eurofarma',
          paragraphs: {
            paragraph1: 'Texto do primeiro parágrafo...',
            paragraph2: 'Texto do segundo parágrafo...'
          }
        }
      }
]
router.get('/items', (req, res) => {
    res.status(200).send(items);
});

router.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const item = items.find(item => item.id == id)

    if(item){
        res.status(200).send(item)
    }else {
        res.status(404).send('Item nao encontrado')
    }
})

// Rota para adicionar um novo item
router.post('/items', (req, res) => {
    const { id, role, username, courses } = req.body;

    // Verifica se todos os campos obrigatórios foram fornecidos
    if (!id || !role || !username || !courses) {
        return res.status(400).send('Bad request, todos os campos são obrigatórios.');
    }

    // Cria um novo item
    const newItem = { id, role, username, courses };

    // Adiciona o novo item ao array
    items.push(newItem);

    // Retorna o item criado
    res.status(201).send(newItem);
});

// Rota para atualizar um item existente (Update)
router.put('/items/:id', (req, res) => {
    const id = req.params.id;
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).send('Item não encontrado');
    }

    // Atualiza os dados do item
    const updatedItem = {
        ...items[index],
        ...req.body
    };

    items[index] = updatedItem;

    res.status(200).send(updatedItem);
});

// Rota para excluir um item existente (Delete)
router.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).send('Item não encontrado');
    }

    // Remove o item do array
    items.splice(index, 1);
    
    res.status(204).send(); // Retorna status 204 (No Content) para exclusão bem-sucedida
});
module.exports = router;