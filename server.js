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
api.post('/client/novo', (req, res) => {
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

//PUT
api.put('/client/update/cpf/:cpf', (req, res) => {
    const { cpf } = req.params;
    const { nome, idade } = req.body;

    // Verifica se todos os dados necessários estão presentes
    if (!nome || !idade) {
        return res.status(400).json({
            mensagem: 'Dados do cliente incompletos',
            status: 400
        });
    }

    // Encontra o cliente com o CPF fornecido
    const clienteIndex = recursos.findIndex(r => r.cpf === cpf);

    if (clienteIndex === -1) {
        return res.status(404).json({
            mensagem: 'Cliente não encontrado',
            status: 404
        });
    }

    // Atualiza o cliente
    recursos[clienteIndex] = {
        ...recursos[clienteIndex],
        nome,
        idade
    };

    // Responde com a confirmação de atualização
    res.status(200).json({
        mensagem: 'Cliente atualizado com sucesso',
        status: 200,
        recurso: recursos[clienteIndex]
    });
});


// Rota DELETE para remover um cliente pelo CPF
api.delete('/client/delete/cpf/:cpf', (req, res) => {
    const { cpf } = req.params;

    // Encontra o índice do cliente com o CPF fornecido
    const clienteIndex = recursos.findIndex(r => r.cpf === cpf);

    if (clienteIndex === -1) {
        return res.status(404).json({
            mensagem: 'Cliente não encontrado',
            status: 404
        });
    }

    // Remove o cliente do array
    const [clienteRemovido] = recursos.splice(clienteIndex, 1);

    // Responde com a confirmação de exclusão
    res.status(200).json({
        mensagem: 'Cliente removido com sucesso',
        status: 200,
        recurso: clienteRemovido
    });
});

api.listen(porta, () => {
    console.log(`Servidor em execução na porta ${porta}`)
})

