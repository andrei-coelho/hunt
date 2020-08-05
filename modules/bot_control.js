"use strict";

var fs       = require('fs'),
    Path     = require('path'),
    api      = null,
    cli      = require('../modules/hunt_cli'),
    log      = require('../helpers/log'),
    datetime = require('../helpers/datetime'),
    analyze  = require('../modules/analyze');

module.exports.conf = conf => {
    api      = (require('../modules/api'))(conf);
}

const open_server = (serviceName, cliente, open, mensagem) => {

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
        } else {
            busca(client, nomes.shift(), nomes);
        }
    });
}

// salvar os perfis que foram adquiridos na busca
const salvar_perfis = (slug, objetos) => {
    api.post('perfis/save/'+slug, objetos, (res, status) =>{
       return; // silence here...
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

// função auxiliar do scrapy ^^
const get_posts = (client, list, index, callback) => {

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

module.exports.analise = (client, open = true) => {
    
    open_server("Analise", client.nome, open, "Fazendo análise das imagens dos perfís...");
    var analise = analyze(client.intents);
   
    api.get("perfis/get_analise/"+client.slug+"/1000", perfis => {
        
        let total = perfis.length;
        if(total === 0) {
            log.out("Não há perfis a serem analisados");
            return;
        }
        log.out("Fazendo análise de " + total + " perfis...");
        
        var directors = [];
        
       // perfis.forEach(p => directors.push(p.id_fb));
        analise_perfis(analise, client.slug, perfis, status => {
            if(status){
                // se ocorreu tudo bem, deleta a pasta e os arquivos
                //delete_dir(directors);
            }
            log.save("Serviço: Analise | Cliente: " + client.nome + " - Finalizado com " + (status ? "sucesso" : "problemas"));   
        })
    })
 
}

// função auxiliar do analise ^^
const analise_perfis = (analise, client_slug, perfis, callback, status = true) => {
    
    var perfil = perfis.shift();

    analise.get_intents(perfil.id_fb, intents => {
        
        if(!intents){
            // altera o perfil para fazer o scrapy novamente
           if(perfis.length == 0){
                callback(status);
            } else {
                analise_perfis(analise, client_slug, perfis, callback, status);
            }

        } else {

            perfil.intents = intents.filter((v, i, a) => a.indexOf(v) === i);
            perfil.analise = 1;

            api.post("perfis/save_intents/"+client_slug, perfil, response => {

                // se der QUALQUER problema ao tentar salvar algum registro...
                // o status torna-se false
                if(response.status != "ok") status = false;
                if(perfis.length == 0){
                    callback(status);
                } else {
                    analise_perfis(analise, client_slug, perfis, callback, status);
                }
                
            })

        }
        

    });
}

module.exports.login = client => {
    console.log("fazendo login do cliente"); 
}

module.exports.restore = (client, open = true) => {
    open_server("Restore", client.nome, open, "Iniciando restauração e corrigindo problemas...");
    /*
    api.post("perfis/restore/"+client.slug, perfis => {
        // envia as slugs dos diretórios escaneados
    })
    */
}

// um helper do scrapy para deletar diretorios
const delete_dir = dir => {
    
    if (!fs.existsSync(dir)) return;

    fs.readdirSync(dir).forEach(file => {
        var atual = Path.join(dir, file);
        if (fs.lstatSync(atual).isDirectory()) { // é um diretorio 
            delete_dir(atual); // chama a função recursivamente
        } else { 
            fs.unlinkSync(atual); // deleta arquivo
        }
    });

    fs.rmdirSync(dir);

}