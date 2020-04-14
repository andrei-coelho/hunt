/* 

    esse módulo é usado para controlar os arquivos node em cmd
    retornando os valores gerados por eles

*/

var cmd = require('node-cmd');

module.exports = function(cookie, agent, lang){
//function(cookie, agent, lang, ip, port){

    var url_fb = "https://www.facebook.com/",
        cookie = "\""+appRoot+"\\json\\cookies\\"+cookie+"\"",
        agent  = "\""+agent+"\"",
        lang   = "\""+lang+"\"";
        //ip     = ip,
        //port   = port;

    var call_file = (file, url, cbk, args = []) => {

        var arquivo = appRoot+"\\cli\\"+file;
        var strArgs = " "+cookie+" "+url+" "+agent+" "+lang;
        args.forEach(arg => strArgs += " \""+arg+"\"");

        var cl = 'phantomjs '+arquivo+strArgs;
        //console.log(cl);
        
        cmd.get(cl, (error, data, stderr) => {
            cbk(error, data, stderr)
        });
       
       
    }

    return {

        search : (q, callback) => {
            let urlFinal = "\""+url_fb+"search/people/?q="+q+"&epa=SERP_TAB\"";
           call_file("search.js", urlFinal, (error, data, stderr) => {
               callback(error, data, stderr)
           });
        },

        login : (email, pass, callback) => {
            call_file("login.js", "\""+url_fb+"\"", (error, data, stderr) => {
               callback(error, data, stderr)
            }, [email, pass]);
        },

        scrapy : (link, callback) => {
            let urlFinal = "\""+url_fb+link+"\"";
            call_file("scrapy.js", urlFinal, (error, data, stderr) => {
                callback(error, data, stderr);
            });
        },

        friends : (link, callback) => {
            let urlFinal = "\""+url_fb+link+"/friends_all\"";
            call_file("friends.js", urlFinal, (error, data, stderr) => {
                callback(error, data, stderr);
            });
        }

    }
}