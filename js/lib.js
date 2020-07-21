if(!('remove' in Element.prototype)){
    Element.prototype.remove = function(){
        if(this.parentNode){
            this.parentNode.removeChild(this);
        }
    };
}

NodeList.prototype.includes = function(node){
    for(var i = 0; i < this.length; i++){
        if(node == this[i]) return node;
    }
    return null;
}

function closest(elem, parentSelector){
    var candidates = document.querySelectorAll(parentSelector);
    var parent = elem.parentElement;

    while(parent.nodeName != "BODY"){
        if(candidates.includes(parent)) return parent;
        parent = parent.parentElement;
    }
    return null;
}