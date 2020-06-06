"use strict";

var http     = require('http');
var request  = require('request');
var log      = require('../helpers/log');
var datetime = require('../helpers/datetime');

module.exports.start = conf => {

    log.out("Conectando com o servidor da API...", "info", false);
    
    recover_data_on_API(conf.API_URL+"/"+conf.machine+"/client/get", (res, info)=> {    
        
        log.out("Recuperando informações dos clientes...", "info", false);
        var dados = JSON.parse(info);
        
        console.log(dados);

        if(dados.error){
            log.out("Erro interno. A requisição está retornando erro: "+dados.error, "danger", false);
            return;
        }        
        open_server();
    });

}

module.exports.search = client => {
    console.log("fazendo busca de usuarios"); 
}

module.exports.friends = client => {
    console.log("pegando amigos dos usuarios"); 
}

module.exports.scrapy = client => {
    console.log("fazendo scrapy dos usuarios"); 
}

module.exports.analise = client => {
    console.log("fazendo analise dos usuarios"); 
}

module.exports.login = client => {
    console.log("fazendo login do cliente"); 
}

var recover_data_on_API = (url, callback, t = 2) => {
    
    request(url, (e, res, info) => {
        
        if(e || res.statusCode === 404){
            t++;
            log.out("Erro de Conexão com a API:\nA URL configurada está errada ou o servidor está fora do ar...\nTentativa de nº "+t+" ...", "warning", false, true);
            setTimeout(() => {
                recover_data_on_API(url,callback,t);
            }, 2500);
            return;
        }
        callback(res, info);

    })
}

var open_server = () => {

    var server = http.createServer(),
        bot_image = 
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
    server.listen(3000, '127.0.0.1', () => {
        log.out(bot_image, "info", false);
        log.save("Robô iniciado!", 'info', true, false);
    });

}