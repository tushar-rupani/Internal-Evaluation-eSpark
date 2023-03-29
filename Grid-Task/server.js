const express = require("express");
const bodyParser = require("body-parser")
const mysql2 = require("mysql2");
const app = express();
const utils = require("util");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs"); //We must set this parameter if we want to use EJS as a template engine.
const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Grid_Task"
})
const query = utils.promisify(connection.query).bind(connection);
app.get("/", async(req, res) => {
    const ans = await query(`SELECT * FROM information`);
    res.render("index", {ans});

})
app.post("/save-data", async (req, res) => {
    const data = req.body.data;
    console.log(data);
    const q = `INSERT INTO information (name, email, contact_no, gender, interest) values ('${data[0]}','${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}' )`
    try {
        const ans = await query(q);
        res.json(req.body)
    } catch (error) {
        console.log(error);
        res.send("Bad Request, or maybe there is a problem from our side.")
    }
})

app.post("/update-data", async(req, res) => {
    let data = req.body.data;
    const q = `UPDATE information SET name = '${data[1]}', email = '${data[2]}', contact_no = '${data[3]}', gender = '${data[4]}', interest = '${data[5]}' where id = ${data[0]}`;
    try{
        const ans = await query(q);
        res.json(req.body.data)
    }catch{
        console.log(error);
        res.send("Bad request")
    }
})

app.post("/update-bulk", async(req, res) => {
    const data = req.body.data;
    console.log(data);
    for(const d of data){
        const q = `UPDATE information SET name = '${d[1]}', email = '${d[2]}', contact_no = '${d[3]}', gender = '${d[4]}', interest = '${d[5]}' where id = ${d[0]}`;
        console.log(q);
        try{
            const ans = await query(q);
            console.log(ans);
        }catch(err){
            console.log(err);
        }
    }
    return res.json({msg: "Done"})
})
app.post("/insert-bulk", async(req, res) => {
    let data = req.body.data;
    let length = data[0].length;
    console.log(data);
    for(let i=0; i<length; i++){
        let q = `INSERT INTO information (name, email, contact_no, gender, interest) values ('${data[0][i]}', '${data[1][i]}', '${data[2][i]}', '${data[3][i]}', '${data[4][i]}')`;
        try {
            let ans = await query(q);    
        } catch (error) {
            return console.log(error);
        }
    }
    return res.json({msg: "insert done"})
})
app.listen(7004, () => {
    console.log("App is running");
})