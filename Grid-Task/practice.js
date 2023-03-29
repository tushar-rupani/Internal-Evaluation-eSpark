const userDetails = {
    name: "Tushar",
    course: "MCA",
    printDetails: function () {
        console.log(this);
    }
}
const userDetails2 = {
    name: "Jayesh",
    course: "MSC"
}

const ans = userDetails.printDetails.bind(userDetails2)
ans();