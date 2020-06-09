
module.exports = (conf, client) => {

    var api = (require('../modules/api'))(conf);

    api.get('client/get', (res, status) =>{
       console.log(res, status);
    }, client.slug);

}