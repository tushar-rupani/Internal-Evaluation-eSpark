// let x = 1;

// const parentFunction = () => {
//     let myValue = 2;

//     const childFunction = () => {
//         x += 1;
//         myValue += 1;
//         console.log(x);
//         console.log(myValue);
//     }

//     return childFunction;
// }

// let result = parentFunction();
// result();
// result();
// result(); 


fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.json())
      .then(json => console.log(json))
      





// const credit = ((num) => {
//     let credits = num;
//     console.log(`Initial Credit ${credits}`);
//     return () => {
//         credits--;
//         if(credits < 0) console.log("No Credits Left");
//         else console.log(`Keep on Playing ${credits} left`);
//     }
// })(3);
// credit();
// credit();
// credit();
