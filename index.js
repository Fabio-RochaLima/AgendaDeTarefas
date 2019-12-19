const Commander = require('commander')
const Database = require('./database')
const Tarefas = require('./tarefas')

async function main(){
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome da tarefa")
        .option('-s, --status [value]', "Status da tarefa")
        .option('-p, --prioridade [value]', "Prioridade da tarefa")

        .option('-c, --cadastrar', "Cadastrar tarefa")
        .option('-l, --listar', "Listar tarefa")
        .option('-r, --remover', "Remover tarefa pelo nome")
        .option('-a, --atualizar [value]', "Atualizar tarefa pelo nome")

        .parse(process.argv)
    const tarefas = new Tarefas(Commander)
    try {
        if(Commander.cadastrar){            
            const resultado = await Database.cadastrar(tarefas)
            if(!resultado){
                console.error('A tarefa não foi cadastrada!')
                return
            }
            console.log('Tarefa cadastrada com sucesso')
        }

        if(Commander.listar){
            const resultado = await Database.listar()
            console.log(resultado)
            return
        }
        if(Commander.remover){
            const resultado = await Database.remover(tarefas.nome)
            if(!resultado){
                console.error("Não foi possível remover a tarefa!")
                return
            }
            console.log("Tarefa removida com sucesso!")
        }
        if(Commander.atualizar){
            const nomeParaAtualizar = Commander.atualizar
            //Remover todas as chaves que estiverem com undefined ou null
            const dado = JSON.stringify(tarefas)
            const tarefasAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(nomeParaAtualizar, tarefasAtualizar)
            if(!resultado){
                console.error('Não foi possível atualizar a tarefa!')
                return
            }
            console.log('Tarefa atualizada com sucesso!')
        }
        
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}
main()