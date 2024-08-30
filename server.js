const express = require('express')
const api = express()
const porta = 80

let recursos=[]
api.use(express.json())
api.get('/', (req, res) => {
    const rotaPadrao = 
    {
        nome_rota: '/',
        codigo_status:'200',
        metodo: 'GET'
    }

    res.status(200)
    res.json(recursos)
})

// Rota POST para criar um novo recurso
api.post('/', (req, res) => {
    // Obtém os dados do corpo da requisição
    const { nome, idade, cpf } = req.body;

    // Verifica se os dados necessários estão presentes
    if (!nome || !idade || !cpf) {
        return res.status(400).json({
            mensagem: 'Dados do cliente incompletos',
            status: 400
        });
    }

    // Cria um novo recurso
    const novoRecurso = {
        id: Date.now().toString(), // Gera um ID único baseado no timestamp
        nome,
        idade,
        cpf
    };

    // Adiciona o novo recurso ao array
    recursos.push(novoRecurso);

    // Responde com a confirmação de criação
    res.status(201).json({
        mensagem: 'Cliente criado com sucesso',
        status: 201,
        recurso: novoRecurso
    });
});


api.listen(porta, () => {
    console.log(`Servidor em execução na porta ${porta}`)
})

