const express = require("express")
const bodyParser = require("body-parser");
const mysql2 = require("mysql2")
const app = express();
const utils = require("util");
const { findSourceMap } = require("module");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));
const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Job Application"
})
var state_data, course_data, lang_data, tech_data, location_data, gender_data;

app.get("/", (req, resp) => {
    let page_name = "home"
    connection.query(`select * from state_master`, (err, ans) => {
        if (err) return console.log(err.message);
        state_data = ans
    })
    connection.query(`select * from Options_Master where select_id = 2`, (err, ans) => {
        if (err) return console.log(err.message);
        course_data = ans
    })
    connection.query(`select * from Options_Master where select_id = 3`, (err, ans) => {
        if (err) return console.log(err.message);
        lang_data = ans
    })
    connection.query(`select * from Options_Master where select_id = 4`, (err, ans) => {
        if (err) return console.log(err.message);
        tech_data = ans
    })
    connection.query(`select * from Options_Master where select_id = 5`, (err, ans) => {
        if (err) return console.log(err.message);
        location_data = ans
    })
    connection.query(`select * from Options_Master where select_id = 6`, (err, ans) => {
        if (err) return console.log(err.message);
        gender_data = ans
        resp.render("index", { state_data: state_data, course_data, lang_data, tech_data, location_data, gender_data, page_name })
    })
})

var id_data;
app.post("/data", (req, resp) => {
    var errMsg = false;
    const final_addr = req.body.address1 + " " + req.body.address2 + " " + req.body.city + " " + req.body.pincode;
    // id_data = res[0].data + 1;
    var personal_sql = `INSERT INTO personal_info (first_name, last_name, contact_no, address, email, gender, dob, created_at, state, city) VALUES('${req.body.fname}', '${req.body.lname}', '${req.body.ph}', '${final_addr}', '${req.body.email}', '${req.body.gender}', '${req.body.date}', NOW(), '${req.body.state}', '${req.body.city}')`;

    connection.query(personal_sql, (err, res) => {
        if (err) {
            var errMsg = true;
            console.log(err);
            return
        }
        id_data = res.insertId;
        let ed_length = req.body.education.length;
        let education = req.body.education;
        let year = req.body.year;
        let board = req.body.board;
        let percentage = req.body.percentage;

        if (Array.isArray(education)) {
            for (let i = 0; i < ed_length; i++) {
                var ed_sql = `INSERT INTO Academic (personal_id, course, board, passing_year, percentage) VALUES(${id_data}, '${education[i]}', '${board[i]}', '${year[i]}', '${percentage[i]}')`;
                connection.query(ed_sql, (err, res) => {
                    if (err) {
                        console.log(err);
                        return
                    }
                })
            }
        } else {
            var ed_sql = `INSERT INTO Academic (personal_id, course, board, passing_year, percentage) VALUES(${id_data}, '${education}', '${board}', '${year}', '${percentage}')`;
            connection.query(ed_sql, (err, res) => {
                if (err) {
                    var errMsg = true;
                    console.log(err);
                    return
                }
            })
        }
        let compny_length = req.body.company.length;
        let company_name = req.body.company;
        let designation = req.body.designation;
        let from_data = req.body.from_date;
        let to_data = req.body.to_date;

        if (Array.isArray(company_name)) {
            for (let i = 0; i < compny_length; i++) {
                var ed_sql = `INSERT INTO Experience (personal_id, company_name, start_date, end_date, CTC) VALUES(${id_data}, '${company_name[i]}', '${from_data[i]}', '${to_data[i]}',  '${designation[i]}')`;
                connection.query(ed_sql, (err, res) => {
                    if (err) {
                        console.log(err);
                        return
                    }
                })
            }
        } else {
            var ed_sql = `INSERT INTO Experience (personal_id, company_name, start_date, end_date, CTC) VALUES(${id_data}, '${company_name}', '${from_data}', '${to_data}', '${designation}',)`;
            connection.query(ed_sql, (err, res) => {
                if (err) {
                    var errMsg = true;
                    console.log(err);
                    return
                }
            })
        }


        let ref_length = req.body.ref_name.length;
        let ref_name = req.body.ref_name;
        let ref_cno = req.body.ref_cno;
        let ref_relation = req.body.ref_relation;
        if(!Array.isArray(ref_name)){
            ref_name = [ref_name]
        }
        if(!Array.isArray(ref_cno)){
            ref_cno = [ref_cno]
        }
        if(!Array.isArray(ref_relation)){
            ref_relation = [ref_relation]
        }
        

        for (let i = 0; i < ref_length; i++) {
            var ed_sql = `INSERT INTO Reference_Tab (name, contact_no, relation, personal_id) VALUES('${ref_name[i]}', '${ref_cno[i]}', '${ref_relation[i]}', ${id_data})`;
            connection.query(ed_sql, (err, res) => {
                if (err) {
                    console.log(err);
                    return
                }
            })
        }


        let lang_ans = req.body.lang;
        if (!Array.isArray(lang_ans)) {
            lang_ans = [lang_ans];
        }
        for (let i = 0; i < lang_ans.length; i++) {
            var lang = lang_ans[i];
            console.log(lang);
            var r = req.body[lang_ans[i] + "r"];
            var w = req.body[lang_ans[i] + "w"];
            var s = req.body[lang_ans[i] + "s"];
            if (typeof (r) == "undefined") r = "0";
            if (typeof (w) == "undefined") w = "0";
            if (typeof (s) == "undefined") s = "0";

            if (typeof (lang) == "string") {
                query_lan = `insert into Languages_Known (personal_id,language,rea,wr,speak) values(${id_data},'${lang}','${r}','${w}','${s}')`;
                connection.query(query_lan, (err, ans) => {
                    if (err) return console.log(err.message);
                })
            }
        }



        let tech_ans = req.body.tech;
        if (!Array.isArray(tech_ans)) {
            tech_ans = [tech_ans];
        }
        for (let i = 0; i < tech_ans.length; i++) {
            var tech = tech_ans[i];
            var a = req.body[tech + "a"];

            if (typeof (tech) == "string") {
                query_lan = `insert into Technologies (personal_id,technology, profiency) values(${id_data},'${tech}','${a}')`;
                connection.query(query_lan, (err, ans) => {
                    if (err) return console.log(err.message);
                })
            }
        }


        let location = req.body.locations;
        if (!Array.isArray(location)) {
            location = [location]
        }
        let lo_string = "";
        location.forEach(place => lo_string += place + " ")

        var ctcQuery = `INSERT INTO CTC (personal_id, Current_CTC, Expected_CTC, Preferred_Locations, Notice_Period ) VALUES(${id_data}, ${req.body.cctc}, ${req.body.ectc}, '${lo_string}', '${req.body.period}')`;
        connection.query(ctcQuery, (err, res) => {
            if (err) {
                var errMsg = true;
                console.log(err);
                return
            }

        })
        if (!errMsg) {
            resp.render("complete")
        }
    })


})

app.get("/show", (req, res) => {
    var page_name = "show";
    var personal_query = "SELECT * FROM personal_info where isDeleted = 0 order by id desc";
    connection.query(personal_query, (err, ans) => {
        if (err) return console.log(err.message);
        res.render("data", { ans, page_name, searchString: "", choice: "" });
    })
})

app.get("/archives", (req, res) => {
    var page_name = "archives";
    var personal_query = "SELECT * FROM personal_info where isDeleted = 1 order by id desc";
    connection.query(personal_query, (err, ans) => {
        if (err) return console.log(err.message);
        res.render("archives", { ans, page_name, searchString: "", choice: "" });
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
        res.render("data", { ans, searchString, choice, page_name: "test" })
    })
})
app.get("/test-api", (req, res) => {
    var personal_query = "SELECT * FROM personal_info order by id desc";
    connection.query(personal_query, (err, ans) => {
        if (err) return console.log(err.message);
        res.json({ ans });
        //res.render("data", { ans, searchString: "", choice: "" });
    })

})
app.post("/test-api", (req, res) => {
    console.log(req.body);
    return res.json({ success: "Request Fetched" })
})



app.get("/test-api-view", (req, res) => {

    res.render("api-view");
})
app.get("/delete-data/:id", (req, res) => {
    console.log(req.params.id);
    let update_query = `UPDATE personal_info SET isDeleted = 1 where id = ${req.params.id}`;
    connection.query(update_query, (err, ans) => {
        if (err) return console.log(err.message);
        console.log(ans);
    })
    res.json({ ans: "working" })
})

app.get("/restore-data/:id", (req, res) => {
    let update_query = `UPDATE personal_info SET isDeleted = 0 where id = ${req.params.id}`;
    connection.query(update_query, (err, ans) => {
        if (err) return console.log(err.message);
        console.log(ans);
    })
    res.json({ ans: "working" })
})


app.get("/state/:id", (req, res) => {
    let id = req.params.id;
    let sqlQuery = `SELECT * FROM city_master where state_id = ${id}`;
    connection.query(sqlQuery, (err, ans) => {
        if (err) return console.log(err.message);
        return res.json({ ans })
    })
})

app.post("/delete-bulk", (req, res) => {
    id_array = req.body.id_data;
    console.log(id_array);
    id_array.forEach(id => {
        let update_query = `UPDATE personal_info SET isDeleted = 1 where id = ${id}`;
        connection.query(update_query, (err, ans) => {
            if (err) return console.log(err);
        })
    })
    res.json({ ans: "Data has been deleted" })
})

app.post("/restore-bulk", (req, res) => {
    id_array = req.body.id_data;

    id_array.forEach(id => {
        let update_query = `UPDATE personal_info SET isDeleted = 0 where id = ${id}`;
        connection.query(update_query, (err, ans) => {
            if (err) return console.log(err);
        })
    })
    res.json({ ans: "Data has been restored" })
})


app.get("/functions", (req, res) => {
    let state_query = "SELECT * FROM state_master";
    connection.query(state_query, (err, ans) => {
        if (err) return console.log(err);
        res.render("function", { ans })
    })
})
app.post("/edit-user", async (req, res) => {
    console.log(req.body);
    if (req.body.id == 1) {
        console.log(req.body);
        const { fname, lname, desig, email, address1, city, state, gender, pincode, date, ph } = req.body;
        q = `UPDATE personal_info SET first_name = '${fname}', last_name = '${lname}', email = '${email}', address = '${address1}', city = '${city}', state = '${state}', gender = '${gender}', dob = '${date}', contact_no = '${ph}' where id = ${req.body.user_id}`;
        connection.query(q, (err, ans) => {
            if (err) return console.log(console.log(err));
            return res.redirect(`edit/${req.body.user_id}`)

        })
    }
    else if (req.body.id == 2) {
        const query = utils.promisify(connection.query).bind(connection);
        const { user_id, education, board, year, percentage } = req.body;
        let ans = await query(`UPDATE Academic SET soft_delete = 1 where personal_id = ${user_id}`);
        if (!Array.isArray(education)) {
            education = [education];
        }
        if (!Array.isArray(board)) {
            board = [board];
        }
        if (!Array.isArray(year)) {
            year = [year];
        }
        if (!Array.isArray(percentage)) {
            percentage = [percentage];
        }

        for (let i = 0; i < education.length; i++) {
            let insert_ans = connection.query(`INSERT INTO Academic SET course = '${education[i]}', board = '${board[i]}', passing_year = '${year[i]}', percentage = ${percentage[i]}, personal_id = ${user_id}`, (err, ans) => {
                if (err) return console.log(err.message);
            });
        }
        return res.redirect(`edit/${user_id}`)
    }
    else if (req.body.id == 3) {
        console.log(req.body);
        const { user_id } = req.body;
        connection.query(`UPDATE Languages_Known SET soft_delete = 1 where personal_id = ${user_id}`, (err, ans) => {
            if (err) return console.log(err.message);
        })
        let lang_ans = req.body.lang;
        if (!Array.isArray(lang_ans)) {
            lang_ans = [lang_ans];
        }
        console.log("lang ans", lang_ans);
        for (let i = 0; i < lang_ans.length; i++) {
            var lang = lang_ans[i];
            console.log(lang);
            var r = req.body[lang_ans[i] + "r"];
            var w = req.body[lang_ans[i] + "w"];
            var s = req.body[lang_ans[i] + "s"];
            if (typeof (r) == "undefined") r = "0";
            if (typeof (w) == "undefined") w = "0";
            if (typeof (s) == "undefined") s = "0";

            if (typeof (lang) == "string") {
                query_lan = `insert into Languages_Known (personal_id,language,rea,wr,speak) values(${user_id},'${lang}','${r}','${w}','${s}')`;
                connection.query(query_lan, (err, ans) => {
                    if (err) return console.log(err.message);
                })
            }
        }
    }
    else if (req.body.id == 4) {
        console.log(req.body);
        const { user_id } = req.body;
        connection.query(`UPDATE Technologies SET soft_delete = 1 where personal_id = ${user_id}`, (err, ans) => {
            if (err) return console.log(err.message);
        })
        let tech_ans = req.body.tech;
        if (!Array.isArray(tech_ans)) {
            tech_ans = [tech_ans];
        }
        for (let i = 0; i < tech_ans.length; i++) {
            var tech = tech_ans[i];
            var a = req.body[tech + "a"];

            if (typeof (tech) == "string") {
                query_lan = `insert into Technologies (personal_id,technology, profiency) values(${user_id},'${tech}','${a}')`;
                connection.query(query_lan, (err, ans) => {
                    if (err) return console.log(err.message);
                })
            }
        }
        res.json({ ans: "Data Updated" })
    }
    else if (req.body.id == 5) {
        const { user_id } = req.body;
        connection.query(`UPDATE Reference_Tab SET soft_delete = 1 where personal_id = ${user_id}`, (err, ans) => {
            if (err) return console.log(err.message);
        })
        let ref_length = req.body.ref_name.length;
        let ref_name = req.body.ref_name;
        let ref_cno = req.body.ref_cno;
        let ref_relation = req.body.ref_relation;
        if(!Array.isArray(ref_name)){
            ref_name = [ref_name]
        }
        if(!Array.isArray(ref_cno)){
            ref_cno = [ref_cno]
        }
        if(!Array.isArray(ref_relation)){
            ref_relation = [ref_relation]
        }
        

        for (let i = 0; i < ref_length; i++) {
            var ed_sql = `INSERT INTO Reference_Tab (name, contact_no, relation, personal_id) VALUES('${ref_name[i]}', '${ref_cno[i]}', '${ref_relation[i]}', ${user_id})`;
            connection.query(ed_sql, (err, res) => {
                if (err) {
                    console.log(err);
                    return
                }
            })
        }
        res.json({ans: "Data Updated"})

    }
    else if(req.body.id == 6){
        console.log(req.body);
        const { user_id } = req.body;

        connection.query(`UPDATE Experience SET soft_delete = 1 where personal_id = ${user_id}`, (err, ans) => {
            if (err) return console.log(err.message);
        })
        let compny_length = req.body.company.length;
        let company_name = req.body.company;
        let designation = req.body.designation;
        let from_data = req.body.from_date;
        let to_data = req.body.to_date;

        if (Array.isArray(company_name)) {
            for (let i = 0; i < compny_length; i++) {
                var ed_sql = `INSERT INTO Experience (personal_id, company_name, start_date, end_date, CTC) VALUES(${user_id}, '${company_name[i]}', '${from_data[i]}', '${to_data[i]}',  '${designation[i]}')`;
                connection.query(ed_sql, (err, res) => {
                    if (err) {
                        console.log(err);
                        return
                    }
                })
            }
        } else {
            var ed_sql = `INSERT INTO Experience (personal_id, company_name, start_date, end_date, CTC) VALUES(${user_id}, '${company_name}', '${from_data}', '${to_data}', '${designation}')`;
            connection.query(ed_sql, (err, res) => {
                if (err) {
                    var errMsg = true;
                    console.log(err);
                    return
                }
            })
        }

    }
    else if(req.body.id == 7){
        console.log(req.body);
        const { user_id } = req.body;
        connection.query(`UPDATE CTC SET soft_delete = 1 where personal_id = ${user_id}`, (err, ans) => {
            if (err) return console.log(err.message);
        })

        let location = req.body.locations;
        if (!Array.isArray(location)) {
            location = [location]
        }
        let lo_string = "";
        location.forEach(place => lo_string += place + " ")

        var ctcQuery = `INSERT INTO CTC (personal_id, Current_CTC, Expected_CTC, Preferred_Locations, Notice_Period ) VALUES(${user_id}, ${req.body.cctc}, ${req.body.ectc}, '${lo_string}', '${req.body.period}')`;
        connection.query(ctcQuery, (err, res) => {
            if (err) {
                var errMsg = true;
                console.log(err);
                return
            }
            
        })
        res.json({ans: "data updated"})

    }
})
app.get("/edit/:id", (req, res) => {

    let user_id = req.params.id;
    page_name = "edit"
    let gender_data, state_data, user_data, course_data, locations, users_lang_data, user_location_data, location_data, lang_data, user_tech_data, user_ref_data, tech_data, user_edu_data;

    connection.query(`select * from personal_info where id = ${user_id}`, (err, ans) => {
        if (err) return res.status(400).json({ msg: err.message })
        user_data = ans
    })
    connection.query(`select * from state_master`, (err, ans) => {
        if (err) return console.log(err.message);
        state_data = ans
    })
    connection.query(`select * from Options_Master where select_id = 2`, (err, ans) => {
        if (err) return console.log(err.message);
        course_data = ans
    })
    connection.query(`select * from Languages_Known where personal_id = ${user_id} and soft_delete = 0`, (err, ans) => {
        if (err) return console.log(err.message);
        users_lang_data = ans
    })
    connection.query(`select * from Options_Master where select_id = 3`, (err, ans) => {
        if (err) return console.log(err.message);
        lang_data = ans
    })
    connection.query(`select * from Options_Master where select_id = 4`, (err, ans) => {
        if (err) return console.log(err.message);
        tech_data = ans
    })
    connection.query(`select * from Technologies where personal_id = ${user_id} and soft_delete = 0`, (err, ans) => {
        if (err) return console.log(err.message);
        user_tech_data = ans
    })
    connection.query(`select * from Academic where personal_id = ${user_id} and soft_delete = 0`, (err, ans) => {
        if (err) return console.log(err.message);
        user_edu_data = ans

    })
    connection.query(`select * from Reference_Tab where personal_id = ${user_id} and soft_delete = 0`, (err, ans) => {
        if (err) return console.log(err.message);
        console.log(ans);
        user_ref_data = ans

    })
    connection.query(`select * from CTC where personal_id = ${user_id} and soft_delete = 0`, (err, ans) => {
        if (err) return console.log(err.message);
        if(ans[0]){
        locations = ans[0]?.Preferred_Locations;
        locations = locations.trim()
        locations = locations.split(" ");
        user_location_data = ans
        }
        
    })
    connection.query(`select * from Options_Master where select_id = 5`, (err, ans) => {
        if (err) return console.log(err.message);
       
        location_data = ans
    })
    connection.query(`select * from Options_Master where select_id = 6`, (err, ans) => {
        if (err) return console.log(err.message);
        gender_data = ans

        res.render("edit-cam", { gender_data, state_data, user_data,page_name, course_data, locations,  users_lang_data, user_location_data, lang_data, tech_data, location_data, user_tech_data, user_edu_data, user_ref_data })
    })
})


app.get("/experience-data/:id", (req, res) => {
    let user_id = req.params.id;
    connection.query(`select * from Experience where personal_id = ${user_id} and soft_delete = 0`, (err, ans) => {
        if (err) return console.log(err.message);
        res.json({ ans });
    })
})
app.post("/restore-all", (req, res) => {
    let update_query = `UPDATE personal_info SET isDeleted = 0`;
    connection.query(update_query, (err, ans) => {
        if (err) return console.log(err);
    })
    res.json({ ans: "Data has been restored" })
})
app.listen(7002, () => console.log("Job App is running"));
