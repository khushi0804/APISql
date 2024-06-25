const express = require('express');
const mysql = require("mysql");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}


const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});
db.connect((err) => {
    if (err) {
        throw (err);
    }
    console.log("mySQL is database connected ")
});


// CRUD OPERATIONS

// get data
app.get("/getUserList", function (req, res) {
    let query = "select * from mynodesql.table";
    db.query(query, (err, result) => {

        if (err) {
            res.json({ msg: err });
        }
        else {
            res.json({ msg: result })
        }
    })

});



// POST data
app.post("/saveUser", function (req, res) {
    let query = "insert into mynodesql.table SET ?";
    console.log(req.body);
    let postData = {
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,

    };
    // by the help of ? we can give the data according to our need,The question mark will replace with post data 
    db.query(query, postData, (err, result) => {

        if (err) {
            res.json({ msg: err });
        }
        else {
            res.json({ msg: "Inserted Successfully" })
        }
    });

});



// update user


app.post("/updateUser/:id", function (req, res) {
    let query = `update mynodesql.table set name='${req.body.name}',email='${req.body.email}',number='${req.body.number}' where id='${req.params.id}'`;

    db.query(query, (err, result) => {

        if (err) {
            res.json({ msg: err });
        }
        else {
            res.json({ msg: "Update data Successfully" })
        }
    });

});



// delete
app.post("/deleteUser/:id", function (req, res) {
    let query = `delete from mynodesql.table where id='${req.params.id}'`;

    db.query(query, (err, result) => {

        if (err) {
            res.json({ msg: err });
        }
        else {
            res.json({ msg: "deleted the user Successfully" })
        }
    });

});










// we use env to set a environment in the server of node js to fetch the data 

app.get("/", function (req, res) {
    res.send("<p>welcome to project</p>")
});

app.get("/about", function (req, res) {
    res.send("<p>this is about page</p>")
});

PORT = process.env.PORT || 1979


app.listen(PORT, function () {


    console.log(`Server is listening at port ${PORT}`)
});