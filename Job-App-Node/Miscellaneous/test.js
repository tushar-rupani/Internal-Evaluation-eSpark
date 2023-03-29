function willWorkAfter2Seonds(count){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Okay I am done now! ${count}`)
        }, 2000);
    })
}

async function asyncCall(){
    console.log("calling");
    var result = await willWorkAfter2Seonds(1)
    console.log(result);
    result = await willWorkAfter2Seonds(2)
    console.log(result);
}

asyncCall()

// fetch("http://localhost:3000/test-api").then(res => res.json()).then(data => console.log(data))