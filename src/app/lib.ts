export function addEvent(to, type, fn){
    if(document.addEventListener){
        to.addEventListener(type, fn, false);
    } else {
        to['on'+type] = fn;
    }  
}