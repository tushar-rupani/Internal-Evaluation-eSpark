console.log("start");

setTimeout(() => {
console.log("completed");
}, 5000)

// fetch("http://localhost:3000/test-api")
// .then(res => res.json())
// .then(data => console.log(data));

console.log("END");

let already_in = []
        let yet_to_insert = []
        async function do_the_work(){
            education.forEach(async (ed) => {
                q = `SELECT * FROM Academic where personal_id = ${user_id} and course = '${ed}'`;
                const ans = await query(q);
                if(ans.length != 0){
                    already_in.push(ans);
                    console.log(already_in);
                }
            })
        }
        do_the_work();