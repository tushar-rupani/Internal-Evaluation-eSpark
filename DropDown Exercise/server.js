const express = require("express");
const app = express();
const mysql2 = require("mysql2/promise")
const connection = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Dropdown"
})
//server.js
app.set("view engine", "ejs");



/* app.get("/data/:id", (req, res) => {
    let id = req.params.id;
    const query = `SELECT * FROM options_master where select_id = ${id}`;
    connection.query(query, (err, ans) => {
        if(err) return console.log(err.message);
        res.json({ans: ans});
    })
})*/
var counter = 0;
app.get("/", async (req, res) => {
    let ans = await getData(1, "radio");
    let ans2 = await getData(2, "check");
    let ans3 = await getData(3, "drop", "multiple");
    let ans4 = await getData(4, "radio");
    let ans5 = await getData(5, "check");
    res.render("index", {ans, ans2, ans3, ans4, ans5})
})

async function getData(id, type, multiple = ""){
    const query = `SELECT * FROM options_master where select_id = ${id}`;
    let ans = await connection.execute(query);
    console.log(ans);
    let ansString = "";
    if(type  == "radio"){
        ans[0].forEach(ele => {
            ansString += `<input type="radio" name="ans${counter}" /> ${ele.data}`
        })
        counter++;
        ansString += `<br/><br/>`
        return ansString;
    }else if(type == "check"){
        ans[0].forEach(ele => {
            ansString += `<input type="checkbox" name=${ele.data} /> ${ele.data}`
        })
        ansString += `<br/><br />`
        return ansString;
    }
    else if(type == "drop"){
        ansString = `<select ${multiple}>`
        ans[0].forEach(ele => {
            ansString += `<option value=${ele.id}>${ele.data}</option>`;
        })
        ansString += `</select><br/><br />`
        return ansString;
    }
    
}
app.listen(7005, () => console.log("App is running"));