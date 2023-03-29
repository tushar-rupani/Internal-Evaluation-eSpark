function memoize(func){
    let cache = {}
    return function(...args){
        console.log(args);
    }
}


function fibonacci(n){
    if(n <= 1){
        return n;
    }else{
        return fibonacci(n-1) + fibonacci(n-2)
    }
}

let memoizeFibo = memoize(fibonacci)
memoizeFibo()