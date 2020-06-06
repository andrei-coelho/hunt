"use strict";

const resp  = /(#(status|object):([^#]+)#)/ig;

module.exports = function(stringMsg){
    return generate(stringMsg);
}

const generate = stringMsg => {

    let values = stringMsg.match(resp);
    let arrval = [];

    values.forEach(element => {
        let val = cleanResult(element);
        arrval.push(val);
    });
    
    return newObject(arrval);
    
}

const cleanResult = str => {

    let qc = str.length;
    return str[0] != "#" || str[qc - 1] != "#" ?
    false : str.substr(1, qc - 2);

}

const newObject = arr => {
    let obj = respObj();
    arr.forEach(el => {
        let vals = el.split(/:(.+)/);
        switch (vals[0]) {
            case "status":
                obj.setStatus(vals[1] === "true");
                break;
            case "object":
                obj.setObj(JSON.parse(vals[1]));
                break;     
        }
    });
    return obj.get();
}

const respObj = function(){
    return {

        obj:null, status:null,

        get : function(){
            return {
                status:this.status,
                obj:this.obj
            }
        },
        setObj : function(obj){
            if(this.obj == null)
            this.obj = obj;
        },
        setStatus : function(status){
            if(this.status == null)
            this.status = status;
        }
    }
    
}