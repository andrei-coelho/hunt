var fs   = require('fs');
const tesseract = require("node-tesseract-ocr");
const Jimp = require("jimp");

// isso aqui é recuperado no objeto global
const intents = [
    {
        "intent":"educacao",
        "regex":
            "((contigenciamento.+)?educacao((do)?\s?brasil|brasileira|mundial|(do)?\s?mundo)?|(contigenciamento.+)?[^\w]mec[^\w]|ministerio da educacao|ministro da educacao|ministro da deseducacao|educacao publica|universidades?|universidades? publicas?|professor(e|a)?s?)",
        "message":"valor"
    },
    {
        "intent":"saude",
        "regex":
            "medicos?($|\s)(estrangeiros?|cubanos?|brasileiros?)?|((sistema|plano)\s?(de\s?)?)?saude(\spublica)?|saneamento(basico)?|[^\w]sus[^\w]|[^\w]upa[^\w]",
        "message":"valor"
    }
];

let get_intent = (text, callback) => {
    var avaliado = false;
    intents.forEach(item => {
        var reg = RegExp(item.regex,'ig');
        if(reg.test(text)) {
            avaliado = true;
            callback(item.intent);
        }
    });
    if(!avaliado)
    callback(false);
};

var save_intent = img => {
    tesseract.recognize(__dirname + img, options)
      .then(text => {
          get_intent(text, intent => {
             !intent ? console.log(img+" > ", "indefinido") :
             console.log(img+" > ", intent);
          });
      })
      .catch(error => {
        console.log(error.message)
      })
}


var objFinal = {};

var get_images = callback => {
    fs.readdir("imagens/color/", async (err, imgs) => {
        let totalImgs = imgs.length;
        let arrCount  = [];
        /*
        // descomentar esse bloco em produção
        imgs.forEach((item, i) => {
            Jimp.read("imagens/color/"+item, (err, image) => {
                if (err) arrCount.push(false);
                image.greyscale().write("imagens/pb/"+item);
                arrCount.push(true);
            });
        });
        let interval = setInterval(() => {
            if(arrCount.length === totalImgs){
                callback(imgs);
                clearInterval(interval);
            }
        }, 500);
        */
        callback(imgs); // apagar em produção
    });
}

var options = {
	l: 'por',
	psm: 1
};

get_images(imgs => {
    imgs.forEach(item => {
        save_intent('\\imagens\\pb\\'+item);
        save_intent('\\imagens\\color\\'+item);
    });
});
