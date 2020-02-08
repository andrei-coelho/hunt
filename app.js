"use strict";

/********************************************************************************
*                                                                               *
*                                                                               *
*                      _______________________________________                  *
*                    /_________                                \                *
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
*                     \______________________________/ /                        *
*                     \_______________________________/                         *
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
*                                                                               *
*********************************************************************************
*                                                                               *
*                      ****  AUTHOR: Andrei Coelho  ***                         *
*                                                                               *
*********************************************************************************
*                                                                               *
*********************************************************************************/

var fs   = require('fs'),
    path = require('path'),
    bot  = require('./modules/bot_control');

var cli  = require('./modules/hunt_cli');

global.appRoot = path.resolve(__dirname);

fs.readFile("./json/conf.json", (e, data) => {

    if (e) throw e;

    if(process.argv[2]){

        switch (process.argv[2]) {
            case "start":
                let conf = JSON.parse(data);
                bot.start(conf);
                break;
            case "test":
            default:

                // para testes de modulos etc..
             
                cli("cookiejar", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36")
                .search('maria', 'eyJjaXR5Ijoie1wibmFtZVwiOlwidXNlcnNfbG9jYXRpb25cIixcImFyZ3NcIjpcIjExMjA0NzM5ODgxNDY5N1wifSJ9',
                (error, data, stderr) => {
                    if(error) throw error;
                    console.log(data);
                    
                });
                
                break;
        }

    }
});

// phantomjs C:\\node-projects\\hunt\\cli\\search.js 'cookiejar' 'https://www.facebook.com/search/people/?q=maria&epa=FILTERS&filters=eyJjaXR5Ijoie1wibmFtZVwiOlwidXNlcnNfbG9jYXRpb25cIixcImFyZ3NcIjpcIjExMjA0NzM5ODgxNDY5N1wifSJ9'
// phantomjs C:\\node-projects\\hunt\\cli\\search.js 'C:\\node-projects\\hunt\\json\\cookies\\cookiejar.json' 'https://www.facebook.com/search/people/?q=maria&epa=FILTERS&filters=eyJjaXR5Ijoie1wibmFtZVwiOlwidXNlcnNfbG9jYXRpb25cIixcImFyZ3NcIjpcIjExMjA0NzM5ODgxNDY5N1wifSJ9' 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'

// MTcxNj@741