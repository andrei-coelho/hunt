"use strict";

    // modulos
var fs   = require('fs'),
    path = require('path'),
    bot  = require('./bot_control'),
    log  = require('../helpers/log'),

    // atributos
    count_args     = process.argv.length,
    args           = process.argv,
    modules        = ['search', 'friends', 'scrapy', 'analise', 'login'];
    global.appRoot = path.resolve(__dirname);

module.exports = function() {
    
    if(count_args < 3) error();
    let command = args[2];

    switch (command) {
        case "-help": help(); break;
        case "-start": start(); break;
        case "-merge": merge(); break;
        case "-commit": commit(); break;
        case "-test": 
            if(count_args < 4) error();
            test(); 
        break;
        default:
            if(count_args < 4) error();
            execute_module();
            break;
    }
    
}

const start = () => {
    // em construção
    under_construction();
}

const merge = () => {
    // em construção
    under_construction();
}

const commit = () => {
    // em construção
    under_construction();
}

const test = () => {
    var file = args[3];
    if(count_args == 5){
        getClientExecute(args[4], (e, client) => {
            if (e) throw e;
            (require('../test/'+file))(client);
        });
        return;
    }
    (require('../test/'+file))();
}

const getClientExecute = (file_client, callback) => {
    fs.readFile("./json/client/"+file_client+".json", (e, client) => callback(e, JSON.parse(client)))
}

const execute_module = () => {

    let msplit = args[3].split(":");
    if(msplit.length != 2 || msplit[0] != "module") error(2)
    if(!modules.includes(msplit[1])) error(3);

    getClientExecute(args[4], (e, client) => {
        if (e) throw e;
        
    });
}

const error = (type = 1) => {
    let msg = "";
    switch (type) {
        case 1:
            msg = "Erro ao iniciar o processo. O quantidade de argumentos não é válida para este comando.";
            break;
        case 2:
            msg = "O módulo não foi especificado corretamente.";
            break;
        case 3:
            msg = "O módulo especificado não existe.";
            break;
    }
    log.out(msg, "danger", false);
    help();
}


const help = ()=> {
    log.out(`
*        ____     ____     ____      ____     _____________     ____________    *
*       /   /|   /   /|   /   /|    /   /|   /    ____     /|  /___    ____/|   *
*      /   /_/__/   / /  /   / /   /   / /  /   /  ___/   / /  |__/   / ____/   *
*     /    ____    / /  /   / /   /   / /  /   / /   /   / /     /   / /        *
*    /   / ___/   / /  /   /_/___/   / /  /   / /   /   / /     /   / /         *
*   /___/ /  /___/ /  /_____________/ /  /___/ /   /___/ /     /___/ /          *
*   |____/   |____/   |______________/   |____/    |____/      |____/           *
*                                                                               *
    USO:`, "warning", false)
    log.out(`
    $ node hunt [command]
    $ node hunt -commit [?client] 
    $ node hunt -test [file] [?client]
    $ node hunt [client] [modules] [?time]
    `, "info", false)
    log.out(`[command]`, "warning", false)
    log.out(`
    -help                 - "mostra as opções de comando"
    -start                - "executa todos os clientes seguindo as configurações de cada um"
    -merge                - "altera, deleta ou cria novos clientes usando a API na nuvem"
    -commit               - "salva todas as alterações de todos os clientes na nuvem"
    -commit [client]      - "salva todas as alterações de um cliente específico"
    -test [file]          - "executa um arquivo de teste em ./test/"
    -test [file] [client] - "executa um arquivo de teste em ./test/ e pega os dados do cliente"
    `, "info", false)
    log.out(`[modules]`, "warning", false)
    log.out(`
    module:start          - "o robô tomará suas próprias decisões seguindo as configurações de um cliente"
    module:friends        - "salva os amigos dos perfis que ainda não foram vistoriados"
    module:scrapy         - "salva os posts dos perfis para análise"
    module:login          - "faz o login do cliente no fb e salva os cookies"
    module:analise        - "analisa as imagens dos perfis"
    module:search         - "faz a busca de perfis conforme config do cliente"
    `, "info", false);
    log.out(`[client]`, "warning", false)
    log.out(`
    "nome do arquivo json do cliente salvo em ./json/clients/"
    `, "info", false)
    log.out(`[file]`, "warning", false)
    log.out(`
    "nome do arquivo de teste em js salvo em ./test/"
    `, "info", false)
    log.out(`[time]`, "warning", false)
    log.out(`
    "O tempo de execução do módulo que pode ser 'm' - para minutos | 'h' - para horas"
    exemplo: '$ node hunt meu_cliente module:search 2h'
    se o tempo não for especificado, o módulo ficará rodando para sempre ou até finalizar as tarefas
    (lembre-se: existem tarefas infinitas)
    `, "info", false)
    process.exit()
}

const under_construction = () => {
    log.out(
        `
*        ____     ____     ____      ____     _____________     ____________    *
*       /   /|   /   /|   /   /|    /   /|   /    ____     /|  /___    ____/|   *
*      /   /_/__/   / /  /   / /   /   / /  /   /  ___/   / /  |__/   / ____/   *
*     /    ____    / /  /   / /   /   / /  /   / /   /   / /     /   / /        *
*    /   / ___/   / /  /   /_/___/   / /  /   / /   /   / /     /   / /         *
*   /___/ /  /___/ /  /_____________/ /  /___/ /   /___/ /     /___/ /          *
*   |____/   |____/   |______________/   |____/    |____/      |____/           *
*                                                                               *
................................ EM CONSTRUÇÃO ..................................`, 
        "warning", 
        false
    )
}