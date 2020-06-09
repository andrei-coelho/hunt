"use strict";

var fs       = require('fs'),
    api      = null,
    cli      = require('../modules/hunt_cli'),
    log      = require('../helpers/log'),
    datetime = require('../helpers/datetime'),
    header   = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36";

module.exports.conf = conf => {
    api      = (require('../modules/api'))(conf);
}

module.exports.start = client => {

}

module.exports.search = (client, open = true) => {

    fs.readFile('./json/names.json', (e, data) => {
        let nomes = JSON.parse(data);
        open_server("Search", client.nome, open, "Buscado perfís para o cliente...");
       busca(client, nomes.shift(), nomes, []);
    })
}

// função auxiliar do search ^^
const busca = (client, nome, nomes) => {
    cli(client.email, header)
    .search(nome, client.filtro_localidade, client.id, (error, response, stderr) => {
        salvar_perfis(response.obj); 
        if(nomes.length == 0){
            log.save("Serviço: Search | Cliente: " + client.nome + " - Finalizado ");
            return;
        } 
        busca(client, nomes.shift(), nomes);
    });
}

const salvar_perfis = objetos => {
    api.post('client/save', objetos, (res, status) =>{
       return; // silence is gold
    });
}


module.exports.scrapy = (client, open = true ) => {
    open_server("Scrapy", client.nome, open, "Realizando trabalho de scrapy...");
}


module.exports.friends = (client, open = true) => {
    open_server("Search", client.nome, open);
    console.log("pegando amigos dos usuarios"); 
}

module.exports.analise = client => {
    console.log("fazendo analise dos usuarios"); 
}

module.exports.login = client => {
    console.log("fazendo login do cliente"); 
}


var open_server = (serviceName, cliente, open, mensagem) => {

    var bot_image = 
    `
    *                   Robô Iniciado na data ${datetime.full()}                  *
    *                                                                               *
    *                      _______________________________________                  *
    *                    /_________                                \\                *
    *                    |_________/       ____      ____          /|               *
    *                     ____    /       /   /     /   /         / /               *
    *                   /____/|  /       /   /     /   /         / /                *
    *                   |____|/ /       /   /     /   /         / /                 *
    *                    __    /       /___/     /___/         / /                  *
    *                  /__/|  /      _________________        / /                   *
    *                  |__|/ /      /_/_/_/_/_/_/_/_/        / /                    *
    *                       /      /_/_/_/_/_/_/_/_/        / /                     *
    *                      /      ------------------       / /                      *
    *                     /                               / /                       *
    *                     \\______________________________/ /                        *
    *                     \\_______________________________/                         *
    *                                                                               *
    *                                                                               *
    *        ____     ____     ____      ____     _____________     ____________    *
    *       /   /|   /   /|   /   /|    /   /|   /    ____     /|  /___    ____/|   *
    *      /   /_/__/   / /  /   / /   /   / /  /   /  ___/   / /  |__/   / ____/   *
    *     /    ____    / /  /   / /   /   / /  /   / /   /   / /     /   / /        *
    *    /   / ___/   / /  /   /_/___/   / /  /   / /   /   / /     /   / /         *
    *   /___/ /  /___/ /  /_____________/ /  /___/ /   /___/ /     /___/ /          *
    *   |____/   |____/   |______________/   |____/    |____/      |____/           *
    *                                                                               *
    *                                                                               *\n`;
    
    if(open) log.out(bot_image, "info", false);
    log.save("Serviço: "+ serviceName + " | Cliente: " + cliente + " - Iniciado ");
    log.out(mensagem, "info", false);
}