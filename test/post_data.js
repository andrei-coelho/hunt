module.exports = (conf, client) => {

    var api = (require('../modules/api'))(conf);

    var obj = {
        id: "1",
        nome: "Marcão Papeleiro",
        slug: "marcao",
        filtro_localidade: "eyJjaXR5Ijoie1wibmFtZVwiOlwidXNlcnNfbG9jYXRpb25cIixcImFyZ3NcIjpcIjEwOTUzNTIyMjQwNjAyNVwifSJ9",
        status: "1",
        email: "andreifcoelho@gmail.com",
        senha: "MTcxNj123"
    }

    api.post('client/test', obj, (res, status) =>{
       console.log(res, status);
    });

}