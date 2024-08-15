const { faker } = require('@faker-js/faker');
//faker was required
const express= require('express');
const app= express();
const path=require("path");
const methodoverride=require("method-override");
app.use(methodoverride("_method"));
app.use(express.urlencoded({extended:true}));
//by useing the templates
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));

//connection cration mysql2 require
let mysql2=require('mysql2');
const connection=mysql2.createConnection({
    host:'localhost',
    user:'root',
    database:'deltaapp',
    password:'113799786@gousiV'

});



let createRandomUser= ()=>  {
    return [
       faker.string.uuid(),
      faker.internet.userName(),
       faker.internet.email(),
     faker.internet.password(),
    ];
  }
  
  // genrate 100 fake data
 /*
  let data=[]
  for(let g=0;g<100;g++){
      data.push(createRandomUser());
  
  }

  */




/*
// in an single arrary let f="insert into user(id, usename,email,password) values(?,?,?,?)";
//let f="insert into user(id, username,email,password) values ?";
let arr=[["255","sk","odd","5662"],["25","skra","add","662"]];
try{
connection.query(f,[data],(err,result)=>{
    if(err) throw err;
    console.log(result);

});

}


catch(err){
    console.log(err);
}
    */
//connection.end();
const port=8080;
//home 
app.get("/",(req,res)=>{
    let q=`select count(*) from user`;
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let us=(result[0]["count(*)"]);
            res.render('home.ejs',{us});
        });

    }
    catch(err){
        console.log(err);
        res.send('there is a error ');
    }
});
//user route
app.get("/user",(req,res)=>{
    let u=`select * from user`;
  try{
    connection.query(u,(error,userresult)=>{

        if(error) throw error;
        
        res.render('users.ejs',{userresult}); //we know we are sending in the from of object
        //console.log(result);
    });
  }
  catch(error){
    console.log(error);
    res.send('there is a error in db');
}
  
  
});
//edit route
app.get("/user/:id/edit",(req,res)=>{
    let {id}=req.params;
    let q=`select * from user where id='${id}'`;

    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            console.log(result);
            let user=result[0];
            res.render('edit.ejs',{user});
        })
    }
    catch(err){
        console.log(err);
    }
 
});

//update route
app.patch("/user/:id",(req,res)=>{
    res.send("updated");

});
    
app.listen(8080 ,()=>{
    console.log(`your i the port number${port}`);

});