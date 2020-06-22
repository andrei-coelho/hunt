var fs   = require('fs');
const tesseract = require("node-tesseract-ocr");
const Jimp = require("jimp");
var intents_module = [];

module.exports = intents_list => {

    // os ids do FB para recuperar as imagens nos diretorios
    intents_module  = // intents_list; // será este
    // isso aqui é recuperado no objeto global intents
    [
        {
            "slug":"educacao",
            "regex":
                "(contigenciamento.+)?educa(c|ç)(ã|a)o((do)?\s?brasil|brasileira|mundial|(do)?\s?mundo)?|contigenciamento(\sda|\sna)?\seduca(c|ç)(ã|a)o?|(^|[^\w])mec($|[^\w])|(^|[^\w])eja($|[^\w])|(^|[^\w])fundeb($|[^\w])|(^|[^\w])ead($|[^\w])|ministerio\sda\seduca(c|ç)(ã|a)o|ministro\sda\seduca(c|ç)(ã|a)o|ministro\sda\sdeseduca(c|ç)(ã|a)o|educa(c|ç)(ã|a)o\spublica|universidades?\s?(publicas?)?|professor(e|a)?s?|creches?|escolas?|pedago(g(o|a)|gia)"
        },
        {
            "slug":"saude",
            "regex":
                "medicina|m(é|e)dicos?($|\s)(estrangeiros?|cubanos?|brasileiros?)?|((sistemas?|planos?|postos?)\s?(de?\s?)?)?sa(ú|u)des?(\sp(ú|u)blic(o|a)s?)?|saneamento(b(á|a)sico)?|(^|[^\w])sus($|[^\w])|(^|[^\w])upa($|[^\w])|(corona\s?)?v(í|i)rus|(^|[^\w])covid(-?19)?($|[^\w])|vacina(ç|c)(ã|a)o|prevenção|(^|[^\w])AIDS($|[^\w])|(^|[^\w])DST($|[^\w])|(^|[^\w])SESA($|[^\w])|a(ç|c)(õ|o)es?\ssanit(a|á)rias?|secretaria\smunicipal(\sd(a|e))?\ssa(u|ú)de|leitos?(\sde)\sUTI($|[^\w])|enfermeir(a|o)s?|enfermagem|fiquem?(\s)?em(\s)?casa"
        }
    ];

    return {

        get_intents: (id_fb, callback) => {
            // recupera todas as imagens do perfil
            generate_images_pb(id_fb, images => {
                // lê as imagens em preto e branco
                read_images(id_fb, images, intents => {
                    // retorna as intenções do perfil
                    callback(intents)
                })
            })
        }

    }

}

const read_images = (id_fb, images, callback, intents = []) => {
    let img = images.shift();
    recognize_intent(id_fb, img, intent => {
        if(intent) intents.push(intent);
        images.length === 0 ?
        callback(intents) :
        read_images(id_fb, images, callback, intents)
    })
    
}


const get = (text, callback, avaliado = false) => {
    console.log(text);
    
    intents_module.forEach(item => {
        var reg = RegExp(item.regex,'ig');
        if(reg.test(text)) {
            avaliado = true;
            callback(item.slug);
        }
    });
    if(!avaliado)
    callback(false);
};

const recognize_intent = (id_fb, img, callback) => {
    var image = appRoot + "\\images\\"+id_fb+"\\pb\\" + img;
    tesseract.recognize(image, options)
    .then(text => {
        get(text, intent => {
            let msg = !intent ? "Não conseguiu identificar uma intenção" : "";
            callback(intent, msg)
        });
    })
    .catch(error => {
        callback(false, "ocorreu um erro ao tentar identificar");
    })
}


const generate_images_pb = (id_fb, callback) => {
    var dir = appRoot + "\\images\\"+id_fb+"\\";
    fs.readdir(dir, (err, list) => {
        
        var imgs = [];
        list.forEach(el => {
            if(/(\.jpg|\.png|\.jpeg)/.test(el)) imgs.push(el)
        })

        let totalImgs = imgs.length;
        
        imgs.forEach((item, i) => {
            Jimp.read(dir+item, (err, image) => {
                image.greyscale().write(dir+"/pb/"+item);
                if((i + 1) === totalImgs){
                    callback(imgs);
                }
            });
        });
      
    });
}

const options = {
	l: 'por',
	psm: 1
};

