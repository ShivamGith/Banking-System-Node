const express = require('express');
const mongoose = require("mongoose");
const app = express();
app.use(express.json())

//Connecting 
mongoose.connect("mongodb://localhost:27017/BankingSystemLF", {
    useNewUrlParser:true,
    useUnifiedTopology:true
}, (err)=>{
    if(!err) console.log("Connected");
    else console.log("error");
});

//Schema
const schema ={
    name:String,
    age:Number,
    email:String,
    pan:String,
    aadhar:Number,
    pincode:Number,
    mobile:Number,
    address:String,
    father:String,
    mother:String,
    dateofbirth:Date,
    gender:String,
    city:String,
    State:String,
    Nationality:String
}

const mongomodel = mongoose.model("ACCOUNTS", schema);

//Post

app.post("/Register", async(req, resp)=>{
    let flagInvalid = false;//if Any error occured
    //Validating name
    if(!validateName(req.body.name)){
        resp.send("Name is Incorrect")
        flagInvalid = true;
    }
    //Validatig Age
    if((typeof(req.body.age) != typeof(1)) || !validateAge(req.body.age)){
        resp.send("Age is Invalid");
        flagInvalid = true;
    }
    //Validating email
    if(!ValidateEmail(req.body.email)){
        resp.send("Email is Invalid");
        flagInvalid = true;
    }
    //pan:String,
    //Validating aadhar:number,
    //Validating pincode:Number,
    let pinc=/^\d{6}$/;
    if(!pinc.test(req.body.pincode)) { flagInvalid = true; resp.send("Pincode is Invalid");}
    //Validating mobile:Number,
    pinc=/^\d{10}$/;
    if(!pinc.test(req.body.mobile)){ flagInvalid = true; resp.send("Mobile is Invalid");}
    //Validating father:String,
    let fathern = /([A-Z]){1}([0-9]){0}([a-z]){2}$/;
    if(!fathern.test(req.body.father)){ flagInvalid = true; resp.send("Fathers Name is Invalid");}
    // Validating mother:String,
    let mothern = /([A-Z]){1}([0-9]){0}([a-z]){2}$/;
    if(!mothern.test(req.body.mother)){ flagInvalid = true; resp.send("Mothers Name is Invalid");}
    // Validating dateofbirth:Date,
    // Validating gender:String,
    let gender = ["Male", "male","Female", "female"];

    // Validating city:String,
    // Validating State:String,
    // Validating Nationality:String
    if(flagInvalid) resp.end("Please correct your details and try again. Thanks");
    else{
        const data = mongomodel({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        })
        const val = await data.save();
        resp.json(val);
    }
});
//routes
app.get('/', (req, resp)=>{
    resp.send('Welcome to Home page');
});
app.get('/help', (req,resp)=>{

    resp.send("This is help page");
});



//Creating Server
app.listen(4002, "127.0.0.1", ()=>{
    console.log("This server is running on 4002");
});   

//Validators
//name
let validateName = function(name){
    if(name.length <= 0 || name == null || name.length >20){ 
        return false};
    var hasnumber = /\d/;
    if(hasnumber.test(name)) return false;
    if(!((name[0]>='A' && name <='Z') || (name[0]>='a' && name <='z'))) return false;
    return true;
}
//age
let validateAge = function(age){
    if(age<=0 || age>=126) return false;
    if(typeof(age) != typeof(1)) return false;
    return true;
}
// email
let ValidateEmail= function(email){
    if(email == null || email.length <=0 || !email.includes("@gmail.com")) return false;
    if((email[0]>='A' && email <='Z')) return false;
    return true;
}

//pan
let ValidatePan = function(pan){
    if(pan == null || pan.length == 0 ) return false;
    var validate = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    if(!validate.test(pan)) return false;
    return true;
}

//aadhar
let ValidateAadhar = function(aadhar){
    if(aadhar<=0 || aadhar >=1000000000000 || aadhar<=99999999999) return false;
    return true;
} 
