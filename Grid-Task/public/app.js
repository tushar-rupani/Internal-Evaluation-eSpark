let saveAllBtn = document.getElementById("saveAll");
saveAllBtn.addEventListener("click", async () => {
    let name = document.querySelectorAll(".name");
    let email = document.querySelectorAll(".email");
    let contact_no = document.querySelectorAll(".contact_no");
    let gender = document.querySelectorAll(".gender");
    let interest = document.querySelectorAll(".interest");
    let nameA = [], emailA = [], contact_noA = [], genderA = [], interestA = [];
    for(const n of name){
        nameA.push(n.value)
    }
    for(const n of email){
        emailA.push(n.value)
    }
    for(const n of contact_no){
        contact_noA.push(n.value)
    }
    for(const n of gender){
        genderA.push(n.value)
    }
    for(const n of interest){
        interestA.push(n.value)
    }
    let finalData = [];
    finalData.push(nameA, emailA, contact_noA, genderA, interestA);
    console.log(finalData);
    const ans = await fetch("/insert-bulk", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: finalData
                })
            })
            const data = await ans.json();
            console.log(data);
            location.reload(true);
    
})

document.addEventListener("keydown", (e) => {
    if(e.ctrlKey && e.keyCode == 83){
        e.preventDefault();
        addRow();
    }else if(e.ctrlKey && e.keyCode == 88){
        e.preventDefault();
        saveAllBtn.click();
    }
})

function addRow() {
    const tbody = document.getElementById("tbody");
    const tr = document.createElement("tr");
    let add = `
    <th scope="row"></th>
    <td> <input type="text" name="name" class="name"></td>
    <td> <input type="text" name="email" class="email"</td>
    <td> <input type="text" name="contact_no" class="contact_no"</td>
    <td> <input type="text" name="gender" class="gender"</td>
    <td> <input type="text" name="interest" class="interest"</td>
    <td> <i class="bi bi-save-fill save-btn"></i> </td>`
    tr.innerHTML = add;

    tbody.appendChild(tr);
    const saves = document.querySelectorAll("table .save-btn");
    const new_data = [];
    console.log(saves);
    saves.forEach(async (save) => {
        save.addEventListener("click", async () => {
            const row = save.parentNode.parentNode;
            const allInputs = row.querySelectorAll("input[type=text]");
            allInputs.forEach(input => {
                new_data.push(input.value);
            })
            const ans = await fetch("/save-data", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: new_data
                })
            })
            const data = await ans.json();
            console.log(data);
            location.reload();

        })


    })
}
async function saveAll(){
    const table = document.querySelector("table");
    console.log(table);
    const data = [];
    for(let i=0; i<table.rows.length; i++){
        const row = table.rows[i];
        const inputs = row.querySelectorAll("input[type=text], input[type=hidden]");
        let enabled = false;
        for (let j = 0; j < inputs.length; j++) {
        console.log(inputs[j].disabled);
          if (!inputs[j].disabled) {
            enabled = true;
            break;
          }
        }
      
        // If any input is enabled, get the values of all inputs in the row
        if (enabled) {
          const rowData = {};
          let subAns = [];
          for (let j = 0; j < inputs.length; j++) {
            subAns.push(inputs[j].value);
          }
          data.push(subAns);
         
        }

      }
      const ans = await fetch("/update-bulk", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: data
        })
      })
      const dataResp = await ans.json();
      console.log(dataResp);
      if(dataResp){
        location.reload(true)
      }
    }
const edits = document.querySelectorAll("table .edit-btn");
edits.forEach(edit => { 
    edit.addEventListener("click", () => {
        const row = edit.parentNode.parentNode;
        const allInputs = row.querySelectorAll("input[type=text], input[type=hidden]");
        edit.classList.add("hidden");
        const updateBtn = row.querySelector(".update-btn");
        updateBtn.classList.remove("hidden");
        let new_data = []
        allInputs.forEach(input => {
            input.disabled = false;
            updateBtn.classList.remove("hidden")
        })
        updateBtn.addEventListener("click", async () => {
            allInputs.forEach(input => {
                input.disabled = false;
                new_data.push(input.value);
            }) 

            const ans = await fetch("/update-data", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: new_data
                })
            })
            const data = await ans.json();
            console.log(data);
            location.reload(true);

        })
    })
})


