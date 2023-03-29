let submitBtn = document.getElementById("submit-btn");
let success = false;
let globalPassword;
let userAvailable = false;
function validating() {
}


let password = document.getElementById("password");
password.addEventListener("keyup", (e) => {
    let errorSpan = document.getElementById("perror");
    let spError = document.getElementById("sperror");
    let pval = e.target.value;
    let passwordValidationRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/
    let isPasswordCorrect = passwordValidationRegex.test(pval);

    if(globalPassword != e.target.value){
        success = false
        activateSubmitButton();
    }
    if(isPasswordCorrect){
        globalPassword = e.target.value
        success = true;
        errorSpan.innerText = "";
        errorSpan.classList.add("hidden")
        activateSubmitButton();
    }else{
        errorSpan.style.color = "red"
        errorSpan.innerText = `Password must contain One Capital Letter, One Special Character and Should have a length of more than 8 digits`;
        errorSpan.classList.remove("hidden")
        success = false
        activateSubmitButton();
    }    

})

let repassword = document.getElementById("repassword");
repassword.addEventListener("keyup", (e) => {
    let errorSpan = document.getElementById("reerror");
    let pval = e.target.value;
    if (pval != globalPassword) {
        errorSpan.style.color = "red"
        errorSpan.innerText = `The password you entered earlier and this does not match`
        errorSpan.classList.remove("hidden")
        success = false
        activateSubmitButton();
    }
    else if (pval == globalPassword) {
        errorSpan.innerText = ""
        errorSpan.classList.add("hidden")
        success = true
        activateSubmitButton();
    }

})

document.getElementById("password").addEventListener("focus", () => {
    document.getElementById("instruction-card").classList.remove("hidden")
})

document.getElementById("repassword").addEventListener("blur", () => {
    document.getElementById("instruction-card").classList.add("hidden")
})
function removeSpan() {
    document.getElementById("error").innerHTML = "";
}

async function checkIfExistsEmail(e, event) {
    let userEntered = e.value;
    let startStatus = false
    if(event.key == "@"){
        startStatus = true
    }
    
    let ans = await fetch("/check-user-email", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userEntered
        })
    })
    let data = await ans.json();
    if (data["status"] == "not" && userEntered != "") {
        document.getElementById("email_available").classList.remove("hidden")
        document.getElementById("email_unavailable").classList.add("hidden")
        userAvailable = true;
        activateSubmitButton();
    } else if (data["status"] == "exist" && userEntered != "") {
        document.getElementById("email_available").classList.add("hidden")
        document.getElementById("email_unavailable").classList.remove("hidden")
        userAvailable = false;
        activateSubmitButton();
    } else {
        userAvailable = false;
        document.getElementById("email_available").classList.add("hidden")
        document.getElementById("email_unavailable").classList.add("hidden")
        activateSubmitButton();
    }
}
async function checkIfExists(e) {
    let userEntered = e.value;

    let ans = await fetch("/check-user", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userEntered
        })
    })
    let data = await ans.json();
    if (data["status"] == "not" && userEntered != "") {
        document.getElementById("available").classList.remove("hidden")
        document.getElementById("unavailable").classList.add("hidden")
        userAvailable = true;
        activateSubmitButton();
    } else if (data["status"] == "exist" && userEntered != "") {
        document.getElementById("available").classList.add("hidden")
        document.getElementById("unavailable").classList.remove("hidden")
        userAvailable = false;
        activateSubmitButton();
    } else {
        userAvailable = false;
        document.getElementById("available").classList.add("hidden")
        document.getElementById("unavailable").classList.add("hidden")
        activateSubmitButton();
    }
}

function emptyFields(){
    let password = document.getElementById("password").value;
    let repassword = document.getElementById("repassword").value;
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    

}

function activateSubmitButton(){
    if(success){
        submitBtn.style.display = "block"
    }else{
        submitBtn.style.display = "none"
    }
}