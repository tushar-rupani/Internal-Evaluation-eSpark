let toggle = document.getElementById("toggle");
let container = document.querySelectorAll(".container");

toggle.addEventListener("click", () => {
    container.forEach(con => {
        if(con.style.border){
            con.style.border = ""
        }else{
            con.style.border = "2px solid red"
        }
    })
})

