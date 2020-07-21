function closest(elem, parentSelector){
    var candidates = Array.from(document.querySelectorAll(parentSelector));
    var parent = elem.parentElement;

    while(parent.nodeName != "BODY"){
        if(candidates.includes(parent)) return parent;
        parent = parent.parentElement;
    }
    return null;
}