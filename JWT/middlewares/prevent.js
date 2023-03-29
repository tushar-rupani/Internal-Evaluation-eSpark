const jwt = require("jsonwebtoken");
require("dotenv").config();
async function auth(req, res, next){
    let token = req.cookies.token;
    if(!token){
        return res.redirect("login");
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
    }
}


function checkIfLoggedIn(req, res, next){
    let token = req.cookies.token;
    if (!token) {
        return res.redirect("/login")
    }
    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded)
    if(decoded){
        next();
    }else{
        return res.send("Invalid Token")
    }
}
module.exports = {auth, checkIfLoggedIn}