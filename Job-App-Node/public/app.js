let container = document.getElementById("educational-container");
let expr_container = document.getElementById("experience-container");
let lang_container = document.getElementById("lang-container");
let tech_container = document.getElementById("tech-container");
let city = document.getElementById("city_drop");
var lang_manager = ["Hindi", "Gujarati", "English"];
var tech_manager = ["Node", "Python", "PHP", "Django"]

document.getElementById("add_expr").addEventListener("click", () => {

    const newDivForEx = document.createElement("div");
    newDivForEx.innerHTML = `
                    Company Name: <input type="text" name="company" id="company"> &nbsp;
                    Designation: <input type="text" name="designation" id="designation"> &nbsp;
                    From: <input type="date" name="from_date" id="from_date"> &nbsp;
                    To: <input type="date" name="to_date" id="to_date"> &nbsp;
                    <br><br>
                `
    expr_container.appendChild(newDivForEx);
})


function updateParent(language){
    const languageClass = language.id;
    let ans = true;
    const parentElement = document.querySelector(`#${languageClass}_parent`);
    parentElement.checked = true;
    
    
}

function selectAll(language){
    // console.log(language.name);
    if(!language.checked){
        document.querySelectorAll(`#${language.name}`).forEach((lan) => {
            lan.checked = false;
        })
    }
}

function dropChange(element){
    var state_id = element.value;
    fetch(`/state/${state_id}`)
    .then(resp => resp.json())
    .then(data =>{
     console.log(data)
    city.innerHTML = ""
    data.ans.forEach(d => {
        city.innerHTML += `<option value=${d.name_city}>${d.name_city}</option>`
    })}
    
    );
}