"use strict";

var fs       = require('fs'),
    api      = null,
    cli      = require('../modules/hunt_cli'),
    log      = require('../helpers/log'),
    datetime = require('../helpers/datetime'),
    analyze  = require('../modules/analyze');

module.exports.conf = conf => {
    api      = (require('../modules/api'))(conf);
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

module.exports.start = client => { }

/**
 * SEARCH MODULE
 */
module.exports.search = (client, open = true) => {

    fs.readFile('./json/names.json', (e, data) => {
        let nomes = JSON.parse(data);
        open_server("Search", client.nome, open, "Buscado perfís para o cliente...");
       busca(client, nomes.shift(), nomes, []);
    })
}

// função auxiliar do search ^^
const busca = (client, nome, nomes) => {
    cli(client.email)
    .search(nome, client.filtro_localidade, client.id, (error, response, stderr) => {
        salvar_perfis(client.slug, response.obj); 
        if(nomes.length == 0){
            log.save("Serviço: Search | Cliente: " + client.nome + " - Finalizado ");
            return;
        } 
        busca(client, nomes.shift(), nomes);
    });
}

// salvar os perfis que foram adquiridos na busca
const salvar_perfis = (slug, objetos) => {
    api.post('perfis/save/'+slug, objetos, (res, status) =>{
       return; // silence is gold
    });
}


/**
 * SCRAPY MODULE
 */

module.exports.scrapy = (client, open = true ) => {

    api.get("perfis/get_scrapy/"+client.slug+"/300", listPerfis => {
        
        open_server("Scrapy", client.nome, open, "Realizando trabalho de scrapy...");

        if(listPerfis.length == 0){
            log.out("Não há novos usuários para realizar o scrapy para o cliente "+client.nome);
            log.save("Serviço: Scrapy | Cliente: " + client.nome + " - Finalizado ");
            return;
        }

        listPerfis.forEach(perfil => {
            let dirImg = appRoot+"\\images\\"+perfil.id_fb;
            if (!fs.existsSync(dirImg)) fs.mkdirSync(dirImg);
        })

        get_posts(client, listPerfis, 0, list => {

            list.forEach(item => item.scrapy = 1);
            log.out("Salvando dados...", "info", false);
            api.post("perfis/update/"+client.slug, list, response => {
                log.save("Serviço: Scrapy | Cliente: " + client.nome + " - Finalizado ");
            })
         
        })

    })

    
}

// aqui faz o scrapy 
var get_posts = (client, list, index, callback) => {

    let perfil = list[index];

    cli(client.email)
    .scrapy(perfil.id_fb, (error, response, stderr) => {
        if(list.length == index + 1){
            callback(list);
            return;
        }
        index = index + 1;
        get_posts(client, list, index, callback);
    })

}


module.exports.friends = (client, open = true) => {
    open_server("Search", client.nome, open);
    console.log("pegando amigos dos usuarios"); 
}

module.exports.analise = client => {
    var analise = analyze(client.tags);
    var analizados = []; // objetos dos perfis analizados que serão enviados via POST
    analise.get_intents("testes", intents => {
        console.log(intents);
    });
    /*
    api.get("perfis/get_analise/"+client.slug, list => {
        list.forEach(item => {
            
        })
    })
    */
    console.log("fazendo analise dos usuarios"); 
}

module.exports.login = client => {
    console.log("fazendo login do cliente"); 
}


