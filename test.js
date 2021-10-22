//target="_blank"
alert('ok');
function add(a, b){
    return a + b;
}

function sub(a, b){
    return a - b;
}

function mul(a, b){
    return a * b;
}

console.log(add(3, 4));

/*function f(){
    return a;
}
function identityf(a){
    return f();
}*/

function identityf(x){return function(){return x}}

function addf(a){
    return function(b){
        return a + b;
    }
}