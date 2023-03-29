const express = require("express")
const bodyParser = require("body-parser");
const mysql2 = require("mysql2/promise")
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));
const connection = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Job Application"
})
var state_data, course_data, lang_data, tech_data, location_data;

app.get("/", async (req, resp) => {
    try {
        const state_data = await connection.execute(`select * from Options_Master where select_id = 1`)
        const course_data = await connection.execute(`select * from Options_Master where select_id = 2`)
        const lang_data = await connection.execute(`select * from Options_Master where select_id = 3`)
        const tech_data = await connection.execute(`select * from Options_Master where select_id = 4`)
        const location_data = await connection.execute(`select * from Options_Master where select_id = 5`)
        resp.render("index", { state_data: state_data[0], course_data: course_data[0], lang_data: lang_data[0], tech_data: tech_data[0], location_data: location_data[0] })
    } catch (error) {
        console.log(error);
    }

})


var id_data;
app.post("/data", async (req, resp) => {
    var errMsg = false;


    const final_addr = req.body.address1 + " " + req.body.address2 + " " + req.body.city + " " + req.body.pincode;
    // id_data = res[0].data + 1;
    var personal_sql = `INSERT INTO personal_info (first_name, last_name, contact_no, address, email, gender, dob, created_at) VALUES('${req.body.fname}', '${req.body.lname}', '${req.body.ph}', '${final_addr}', '${req.body.email}', '${req.body.gender}', '${req.body.date}', NOW())`;

    const data = await connection.execute(personal_sql);
    console.log(data);
    // id_data = res.insertId;
    // let ed_length = req.body.education.length;
    // let education = req.body.education;
    // let year = req.body.year;
    // let board = req.body.board;
    // let percentage = req.body.percentage;

    // if (Array.isArray(education)) {
    //     for (let i = 0; i < ed_length; i++) {
    //         var ed_sql = `INSERT INTO Academic (personal_id, course, board, passing_year, percentage) VALUES(${id_data}, '${education[i]}', '${board[i]}', '${year[i]}', '${percentage[i]}')`;
    //        await connection.query(ed_sql, (err, res) => {
    //             if (err) {
    //                 console.log(err);
    //                 return
    //             }
    //         })
    //     }
    // } else {
    //     var ed_sql = `INSERT INTO Academic (personal_id, course, board, passing_year, percentage) VALUES(${id_data}, '${education}', '${board}', '${year}', '${percentage}')`;
    //     const data = await connection.execute(ed_sql);
    // }
    // let compny_length = req.body.company.length;
    // let company_name = req.body.company;
    // let designation = req.body.designation;
    // let from_data = req.body.from_date;
    // let to_data = req.body.to_date;

    // if (Array.isArray(company_name)) {
    //     for (let i = 0; i < compny_length; i++) {
    //         var ed_sql = `INSERT INTO Experience (personal_id, company_name, start_date, end_date, CTC) VALUES(${id_data}, '${company_name[i]}', '${designation[i]}', '${from_data[i]}', '${to_data[i]}')`;
    //         connection.query(ed_sql, (err, res) => {
    //             if (err) {
    //                 console.log(err);
    //                 return
    //             }
    //         })
    //     }
    // } else {
    //     var ed_sql = `INSERT INTO Experience (personal_id, company_name, start_date, end_date, CTC) VALUES(${id_data}, '${company_name}', '${designation}', '${from_data}', '${to_data}')`;
    //     connection.query(ed_sql, (err, res) => {
    //         if (err) {
    //             var errMsg = true;
    //             console.log(err);
    //             return
    //         }
    //     })
    // }


    // let ref_length = req.body.ref_name.length;
    // let ref_name = req.body.ref_name;
    // let ref_cno = req.body.ref_cno;
    // let ref_relation = req.body.ref_relation;

    // for (let i = 0; i < ref_length; i++) {
    //     var ed_sql = `INSERT INTO Reference_Tab (name, contact_no, relation, personal_id) VALUES('${ref_name[i]}', '${ref_cno[i]}', '${ref_relation[i]}', ${id_data})`;
    //     connection.query(ed_sql, (err, res) => {
    //         if (err) {
    //             console.log(err);
    //             return
    //         }
    //     })
    // }

    // connection.query(`select * from Options_Master where select_id = 3`, (err, results) => {
    //     if (err) return console.log(err.message);
    //     var lan_query = "";
    //     console.log("this results", results);
    //     console.log(req.body);
    //     for (let i = 0; i < results.length; i++) {
    //         var lang = req.body[results[i].value];
    //         var r = req.body[results[i].value + "r"];
    //         var w = req.body[results[i].value + "w"];
    //         var s = req.body[results[i].value + "s"];
    //         if (typeof (r) == "undefined") r = "0";
    //         if (typeof (w) == "undefined") w = "0";
    //         if (typeof (s) == "undefined") s = "0";

    //         if(typeof (lang) == "string"){
    //             query_lan = `insert into Languages_Known (personal_id,language,rea,wr,speak) values(${id_data},'${lang}','${r}','${w}','${s}')`;
    //             connection.query(query_lan, (err, ans) => {
    //                 if(err) return console.log(err.message);
    //             })
    //         }
    //     }
    // })

    // connection.query(`select * from Options_Master where select_id = 4`, (err, results) => {
    //     if (err) return console.log(err.message);
    //     var lan_query = "";
    //     console.log(req.body);
    //     for (let i = 0; i < results.length; i++) {
    //         var tech = req.body[results[i].value];
    //         var a = req.body[results[i].value + "a"];                

    //         if(typeof (tech) == "string"){
    //             query_lan = `insert into Technologies (personal_id,technology, profiency) values(${id_data},'${tech}','${a}')`;
    //             connection.query(query_lan, (err, ans) => {
    //                 if(err) return console.log(err.message);
    //             })
    //         }
    //     }
    // })

    // let location = req.body.locations;
    // if (!Array.isArray(location)) {
    //     location = [location]
    // }
    // let lo_string = "";
    // location.forEach(place => lo_string += place + " ")

    // var ctcQuery = `INSERT INTO CTC (personal_id, Current_CTC, Expected_CTC, Preferred_Locations, Notice_Period ) VALUES(${id_data}, ${req.body.cctc}, ${req.body.ectc}, '${lo_string}', '${req.body.period}')`;
    // connection.query(ctcQuery, (err, res) => {
    //     if (err) {
    //         var errMsg = true;
    //         console.log(err);
    //         return
    //     }

    // })
    // if (!errMsg) {
    //     resp.render("complete")
    // }

})

app.get("/show", (req, res) => {
    var personal_query = "SELECT * FROM personal_info order by id desc";
    connection.query(personal_query, (err, ans) => {
        if (err) return console.log(err.message);
        res.render("data", { ans, searchString: "", choice: "" });
    })
})

app.get("/data-details/:id", (req, res) => {
    let get_id = req.params.id;
    let personal_data, education_data, experience_data, language_data, technology_data, reference_data, CTC_data;
    let personal_query = `SELECT * FROM personal_info where id = ${get_id}`;
    connection.query(personal_query, (err, ans) => {
        personal_data = ans;
    })
    let education_query = `SELECT * FROM Academic where personal_id = ${get_id}`;
    connection.query(education_query, (err, ans) => {
        if (err) return console.log(err.message);
        education_data = ans;

    })
    let experience_query = `SELECT * FROM Experience where personal_id = ${get_id}`;
    connection.query(experience_query, (err, ans) => {
        if (err) return console.log(err.message);
        experience_data = ans;

    })
    let language_query = `SELECT * FROM Languages_Known where personal_id = ${get_id}`;
    connection.query(language_query, (err, ans) => {
        if (err) return console.log(err.message);
        language_data = ans;

    })
    let technology_query = `SELECT * FROM Technologies where personal_id = ${get_id}`;
    connection.query(technology_query, (err, ans) => {
        if (err) return console.log(err.message);
        technology_data = ans;

    })

    let reference_query = `SELECT * FROM Reference_Tab where personal_id = ${get_id}`;
    connection.query(reference_query, (err, ans) => {
        if (err) return console.log(err.message);
        reference_data = ans;
    })

    let preference_query = `SELECT * FROM CTC where personal_id = ${get_id}`;
    connection.query(preference_query, (err, ans) => {
        if (err) return console.log(err.message);
        CTC_data = ans;
        res.render("data-detail", { personal_data, education_data, experience_data, language_data, technology_data, reference_data, CTC_data });

    })
})

app.post("/search", (req, res) => {
    let searchString = req.body.query;
    let choice = req.body.op;
    console.log(choice);
    var delm = ["/", "$", "~", "^"];
    let singleName = "";
    for (let i = 0; i < searchString.length; i++) {
        if (delm.includes(searchString[i])) {
            singleName += " " + searchString[i];
        }
        else {
            singleName += searchString[i]
        }
    }
    var nameArr = singleName.split(" ");
    console.log(nameArr);
    let queryString = "where";
    hasCameBefore = false;
    nameArr.forEach(name => {
        console.log(name[0]);
        if (name[0] == "^") {
            if (hasCameBefore) {
                queryString += ` ${choice} First_Name LIKE '${name.slice(1)}%'`
            }
            else {
                queryString += ` First_Name LIKE '${name.slice(1)}%'`;
                hasCameBefore = true
            }
        }
        if (name[0] == "$") {
            if (hasCameBefore) {
                queryString += ` ${choice} Last_Name LIKE '${name.slice(1)}%'`
            }
            else {
                queryString += ` Last_Name LIKE '${name.slice(1)}%'`
                hasCameBefore = true

            }
        }
        if (name[0] == "~") {
            if (hasCameBefore) {
                queryString += ` ${choice} address LIKE '${name.slice(1)}%'`
            }
            else {
                queryString += ` address LIKE '${name.slice(1)}%'`
                hasCameBefore = true

            }
        }
        if (name[0] == "/") {
            if (hasCameBefore) {
                queryString += `${choice} gender LIKE '${name.slice(1)}%'`
            } else {
                queryString += ` gender LIKE '${name.slice(1)}%'`
                hasCameBefore = true
            }
        }
        console.log(queryString);
    });
    var query = `select * from personal_info ${queryString}`;
    console.log(query);
    connection.query(query, (err, ans) => {
        if (err) return res.send(err.message);
        console.log(ans);
        res.render("data", { ans, searchString, choice })
    })
})
app.listen(3000, () => console.log("App is running"));
