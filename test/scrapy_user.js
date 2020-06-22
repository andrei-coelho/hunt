module.exports = (conf, client ) => {

    var cli = require("../modules/hunt_cli");

    cli(client.email)
    .scrapy("maah.layanne", (error, response, stderr) => {
        console.log(response);
    })


}