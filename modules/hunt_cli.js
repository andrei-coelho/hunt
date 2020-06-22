/* 

    esse módulo é usado para controlar os arquivos node em cmd
    retornando os valores gerados por eles

*/

var cmd = require('node-cmd'),
    response = require('./response');

module.exports = function(cookie){

    var url_fb = "https://www.facebook.com/",
        cookie = "\""+appRoot+"\\json\\cookies\\"+cookie+"\"",
        agent  = "\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36\"", 
        regex  = new RegExp("^[^a-z\.]+$","gi");

    var call_file = (file, url, cbk, args = []) => {

        var arquivo = appRoot+"\\cli\\"+file;
        var strArgs = " "+cookie+" "+url+" "+agent;
        args.forEach(arg => strArgs += " \""+arg+"\"");

        var cl = 'phantomjs '+arquivo+strArgs;

        cmd.get(cl, (error, data, stderr) => {
            cbk(error, data, stderr)
        });
       
    }

    return {

        search : (q, filter = "", id_client, callback) => {
            
            let urlFinal = 
                filter != "" 
                ? "\""+url_fb+"search/people/?q="+q+"&epa=FILTERS&filters="+filter+"\"" 
                : "\""+url_fb+"search/people/?q="+q+"\"";
           
           call_file("search.js", urlFinal, (error, data, stderr) => {
               callback(error, response(data), stderr)
           }, [id_client]);

        },

        login : (email, pass, callback) => {
            
            call_file("login.js", "\""+url_fb+"\"", (error, data, stderr) => {
               callback(error, response(data), stderr)
            }, [email, pass]);

        },

        scrapy : (link, callback) => {
            let urlFinal = 
                regex.test(link) 
                ? "\""+url_fb+"profile.php?id="+link+"\"" 
                : "\""+url_fb+link+"\"";
            let path = "\""+appRoot+"\\images\\" + link + "\"";
                        
   
            call_file("scrapy.js", urlFinal, (error, data, stderr) => {
                callback(error, response(data), stderr);
            }, [path]);
         
   
        },

        friends : (link, callback) => {

            let urlFinal = 
                regex.test(link) 
                ? "\""+url_fb+"profile.php?id="+link+"&sk=friends_all\""
                : "\""+url_fb+link+"/friends_all\"";

            call_file("friends.js", urlFinal, (error, data, stderr) => {
                callback(error, response(data), stderr);
            });

        },

        test : callback => {

            call_file("test.js", "teste", (error, data, stderr) => {
                callback(error, response(data), stderr);
            });
            
        }

    }
}