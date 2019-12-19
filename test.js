const {
    deepEqual,
    ok
} = require('assert')
const database = require('./database')
    const TAREFA_A_CADASTRAR = {
        "nome": "Gerenciar colaboradores",
        "status": "Em andamento",
        "prioridade": 5
    }
    const TAREFA_ATUALIZAR = {
        "nome": "Fazer deploy",
        "status": "Concluído",
        "prioridade": "3"
    }
describe('Suite para gerenciamento de tarefas', () =>{
    before(async ()=> {
        await database.cadastrar(TAREFA_A_CADASTRAR)
        await database.cadastrar(TAREFA_ATUALIZAR)
    })
    it('Deve pesquisar tarefas, atraves de arquivos', async ()=>{
        const expected = TAREFA_A_CADASTRAR
        const [resultado] = await database.listar(expected.nome)
        deepEqual(resultado, expected)
    })    
    it('Deve criar tarefas, usando arquivos', async ()=>{
        const expected = TAREFA_A_CADASTRAR
        const resultado = await database.cadastrar(TAREFA_A_CADASTRAR)
        const [actual] = await database.listar(TAREFA_A_CADASTRAR.nome)        
        deepEqual(actual, expected)
    })
    it('Deve remover a tarefa, através do nome', async() => {
        const expected = true
        const resultado = await database.remover(TAREFA_A_CADASTRAR.nome)
        deepEqual(resultado, expected)
    })
    it('Deve atualizar a tarefa especificada', async()=> {
        const expected = {
            ...TAREFA_ATUALIZAR,
            nome: "Submeter projeto",
            status: "Em andamento",
            prioridade: 4
        }
        const novoDado = {
            nome: "Submeter projeto",
            status: "Encerrado",
            prioridade: 1
        }
        await database.atualizar(TAREFA_ATUALIZAR.nome, expected)
        const resultado = await database.listar(TAREFA_ATUALIZAR.nome)
        deepEqual(resultado, expected)
    })
})