var tusharCities = ["Anand", "Ahmedabad", "Gandhinagar", "Patan", "Vadodara", "Deesa", "Siddhpur"];

var first_name = ["Tushar", "Chirag", "Chintan", "Jigar", "Raj", "Maitree", "Kashish", "Archita", "Pooja", "Parth", "Jayesh", "Manthan", "Yash", "Jatin", "Haresh", "Ravi", "Vikas"]
var last_name = ["Rupani", "Talpada", "Gor", "Joshi", "Patel", "Shah", "Rabari", "Mishra", "Shukla", "Vadodariya", "Shah", "Prajapati", "Ganvani", "Vadoda", "Manvani", "Kumar", "Samrat"]

var tusharContact;
var tusharUniversity;
var tushar_final_ans = "";
var tusharAns = document.getElementById("ans")


for (let i = 0; i < 20000; i++) {
    randomForName = Math.floor(Math.random() * first_name.length);
    randomForLastName = Math.floor(Math.random() * last_name.length);
    let email = first_name[randomForName] + last_name[randomForLastName] + "@gmail.com"
    randomCity = Math.floor(Math.random() * tusharCities.length)
    tusharContact = Math.floor(100000000 + Math.random() * 900000000);
    tusharUniversity = Math.floor(Math.random() * 10) + 1;
    
    tushar_final_ans += `INSERT INTO Student.Student_Mst (First_Name, Last_Name, Contact_No, City, Email, University, createdAt) VALUES ('${first_name[randomForName]}', '${last_name[randomForLastName]}', '${tusharContact}', '${tusharCities[randomCity]}', '${email}', ${tusharUniversity}, NOW()); <br><br>`;

}
tusharAns.innerHTML = tushar_final_ans



/*function generatingFirstName() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


function generatingLastName() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}*/