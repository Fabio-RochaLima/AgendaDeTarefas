const {
    readFile,
    writeFile
} = require('fs')

const {
    promisify
} = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
    constructor(){
        this.NOME_ARQUIVO = 'tarefas.json'
    }
    async obterDadosArquivo(){
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(dados){
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }
    async cadastrar(tarefa){
        const dados = await this.obterDadosArquivo()
        const nome = tarefa.nome == dados.nome ? console.error('DEU RUIM', error) : tarefa.nome
        const status = tarefa.status
        const prioridade = 5
        const dadosUnificados = {
            nome,
            status,
            prioridade,
            ...tarefa
        }
        const dadosFinais = [
            ...dados,
            dadosUnificados
        ]
        const resultado = await this.escreverArquivo(dadosFinais)
        return resultado
    }
    async listar(nome){
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item =>(item.nome))
        return dadosFiltrados
    }
    async remover(nome){
        
        const dados = await this.obterDadosArquivo()        
        const dadosNome = dados.map((tarefa) => tarefa.nome)
        const indice = dadosNome.indexOf(nome)
                
        if (indice == -1){
            throw Error('Tarefa não encontrada')
        }
        dados.splice(indice, 1)
        return await this.escreverArquivo(dados)
    }
    async atualizar(nome, modificacoes){
        const dados = await this.obterDadosArquivo()
        const dadosNome = dados.map((tarefa) => tarefa.nome)
        const indice = dadosNome.indexOf(nome)
        if (indice == -1){
            throw Error('Tarefa nao existe')
        }
        const atual = dados[indice]
        const objetoAtualizar = {
            ...atual,
            ...modificacoes
        }
        dados.splice(indice, 1)

        return await this.escreverArquivo([
            ...dados,
            objetoAtualizar
        ])
    
    }
}

module.exports = new Database()