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

var app  = require('./modules/app');
app(); // tudo começa aqui

/*
fs.readFile("./json/conf.json", (e, data) => {

    if (e) throw e;

    process.argv[2];


    switch (process.argv[2]) {
        
        case "start":
            let conf = JSON.parse(data);
            bot.start(conf);
            break;
        case "test":
        default:

            // para testes de modulos etc..
      
            cli("cookiejar", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36")
            .friends("marciane.silva.7543", (error, response, stderr) => {
                if(error) throw error;
                console.log(response);
            });
            
            /*
            
           .scrapy("maria.perroni.9", (error, data, stderr) => {
                if(error) throw error;
                console.log(data);
            });
            
            .login("andreifcoelho@gmail.com", "MTcxNj123", (error, data, stderr) => {
                if(error) throw error;
                console.log(data);
            });
        
            
            .search("ana", (error, data, stderr) => {
                if(error) throw error;
                console.log(data);
            });

             
            .messenger("ayoubmanda", "mensagem teste", (error, data, stderr) => {
                if(error) throw error;
                console.log(data);
            });
            
        break;
    }
      
});

*/ 

// phantomjs search.js "C:\node-projects\hunt\json\cookies\cookiejar" "https://www.facebook.com/search/people/?q=ana&epa=SERP_TAB" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36" "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7"

