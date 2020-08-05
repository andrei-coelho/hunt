var fs   = require('fs');
const tesseract = require("node-tesseract-ocr");
const Jimp = require("jimp");
var intents_module = [];

module.exports = intents_list => {

    // os ids do FB para recuperar as imagens nos diretorios
    intents_module  = intents_list; // será este
    // isso aqui é recuperado no objeto global intents

    return {

        get_intents: (id_fb, callback) => {
            // recupera todas as imagens do perfil
          
            generate_images_pb(id_fb, images => {
                // lê as imagens em preto e branco
                if(!images){
                    callback(false);
                } else {
                    read_images(id_fb, images, intents => {
                        // retorna as intenções do perfil
                        callback(intents)
                    })
                }
                
            })
          
           
        }

    }

}

const read_images = (id_fb, images, callback, intents = []) => {
    let img = images.shift();
    recognize_intent(id_fb, img, itens => {
        if(!itens) {
            console.log("Erro ao tentar identificar as images");
        }
        itens.forEach(item => intents.push(item))
        images.length === 0 ?
        callback(intents) :
        read_images(id_fb, images, callback, intents)
    })
    
}

const recognize_intent = (id_fb, img, callback, test = 0) => {
    var image = appRoot + "\\images\\"+id_fb+"\\pb\\" + img;
    tesseract.recognize(image, options)
    .then(text => {
        get(text, intents => callback(intents));
    })
    .catch(error => {
        if(test > 1){
            console.log(error);
            callback(false);
        } else {
            setTimeout(() => {
                 recognize_intent(id_fb, img, callback, test + 1);
            }, 1000)
        }
    })
}


const get = (text, callback, avaliado = false) => {
    
    var ids = [];

    intents_module.forEach(item => {
        var reg = RegExp(item.regex,'ig');
        if(reg.test(text)) {
            avaliado = true;
            ids.push(item.id)
        }
    });

    callback(ids);
};




const generate_images_pb = (id_fb, callback) => {
    var dir = appRoot + "\\images\\"+id_fb+"\\";
    fs.readdir(dir, (err, list) => {
        
        if(err){
            // diretório não existe
            callback(false);
            return;
        }

        var imgs = [];
        list.forEach(el => {
            if(/(\.jpg|\.png|\.jpeg)/.test(el)) imgs.push(el)
        })

        let totalImgs = imgs.length;
        
        imgs.forEach((item, i) => {
            Jimp.read(dir+item, (err, image) => {
                image.greyscale().write(dir+"/pb/"+item);
                if((i + 1) === totalImgs){
                    callback(imgs)
                }
            });
        });
    
    });
}

const options = {
	lang: 'por',
	psm: 1
};

