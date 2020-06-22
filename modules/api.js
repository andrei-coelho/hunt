"use strict";

var request  = require('request'),
    config;

module.exports = conf => {
    
    config = conf;

    const get_url = (route, client) => {
        var url  = config.API_URL+config.machine+"/";
        url += route+"/";
        if(client != "") url += client+"/";
        return url;
    }

    const clean_json = json_text => {

        if(json_text[0] != "{" || json_text[0] != "["){
            json_text = json_text.substr(1, json_text.length);
        }
        return json_text;
        
    }

    return {

        get: (route, callback, client = "") => {

            var url = get_url(route, client);
             
            request(url, (e, res) => {
                
                if(e){
                    callback(JSON.parse(clean_json('{"error":"500"}')), 500 );
                    return;
                }

                if(res){
                    let resp = res.toJSON();
                    callback(JSON.parse(clean_json(resp.body)), resp.statusCode);
                    return;
                } 

                // erro no servidor
                callback(JSON.parse(clean_json('{"error":"500"}')), 500 );
                
            })

        },

        post: (route, object, callback, client = "") => {
            
            var url = get_url(route, client);

            request({
                method: 'POST',
                uri: url,
                body: JSON.stringify(object)
                },
                (e, res) => {
                   if(e){
                        callback(JSON.parse(clean_json('{"error":"500"}')), 500 );
                        return;
                    }
                    if(res){
                        let resp = res.toJSON();
                        callback(JSON.parse(clean_json(resp.body)), resp.statusCode);
                        return;
                    } 
                    // erro no servidor
                    callback(JSON.parse(clean_json('{"error":"500"}')), 500 );
                }
            )

        }


    }

    

}

