/* 

    esse módulo é usado para controlar os arquivos node em cmd
    retornando os valores gerados por eles

*/

var cmd = require('node-cmd');

module.exports = 
function(cookie, agent){
//function(cookie, agent, ip, port){

    var url_fb = "https://www.facebook.com/",
        cookie = "\""+appRoot+"\\json\\cookies\\"+cookie+"\"",
        agent  = "\""+agent+"\"";
        //ip     = ip,
        //port   = port;

    var call_file = (file, url, cbk, args = []) => {

        var arquivo = appRoot+"\\cli\\"+file;
        var strArgs = " "+cookie+" "+url;
        args.forEach(arg => strArgs += " "+arg);

        var cl = 'phantomjs '+arquivo+strArgs;
        
        cmd.get(cl, (error, data, stderr) => {
            cbk(error, data, stderr)
        });
   
    }

    return {

        search : (q, city, callback) => {
            let urlFinal = "\""+url_fb+"search/people/?q="+q+"&epa=FILTERS&filters="+city+"\"";
           call_file("search.js", urlFinal, (error, data, stderr) => {
               callback(error, data, stderr)
           });
        },

        login : () => {
            //
        },

        friends : () => {
            //
        },

        scrapy : () => {
            //
        }

    }
}