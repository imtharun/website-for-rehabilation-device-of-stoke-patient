const mysql = require('mysql');
const config = require('./config_sql');
const con = mysql.createConnection({
    host: config.host,
    user: config.uname,
    password: config.upass,
    database: config.database
});
connect();
//used to establish connection with the database
function connect(){
    con.connect(function(err){
        if (err) throw err;
        console.log("MYsql Connected!");
    });
}


//used to check weather the user is authorised or not
function authorise(email,password,callback)
{
    let results;
    sql = 'SELECT password from auth where user_id = ?';
    const value = [email];
    con.query(sql,value,(err,result)=>
    {
        if(result.length===0)
        {
            results = {"access":"deniedx",
            "userid":"result.useridfromdatabase"};
            callback(err,results);
            return;
        }
        else
        {
        const  resultArray = Object.values(JSON.parse(JSON.stringify(result))[0])[0];
        if(password === resultArray)
        {
            results = {
                "access":"granted",
                "userid":"result.useridfromdatabase"     
            };
        }
        else
        {
            results = {"access":"deniedx",
            "userid":"result.useridfromdatabase"};
        }
        callback(err,results);
    }
    })
}

//dashboard functions
function dashboard_patient(patientid,callback){
    sql = "get patient dashboard data";
    con.query(sql,patientid,(err,result)=>{
        callback(err,results);
    })
}


function dashboard_doctor(doctorid,callback){ 
    sql = "get doctor dashboard data";
    con.query(sql,doctorid,(err,result)=>{
        callback(err,results);
    })    
}

function dashboard_caretaker(caretakerid,callback){
    sql = "get caretaker dashboard data";
    con.query(sql,caretakerid,(err,result)=>{
        callback(err,results);
    })
}


//register the respective users
function registerpatient(callback){
    console.log("registerpatient");
}
function registerdoctor(callback){
    console.log("registerdoctor");
}
function registercaretaker(callback){
    console.log("registercaretaker");
}



module.exports = {
    authorise,
    dashboard_caretaker,
    dashboard_doctor,
    dashboard_patient,
    registercaretaker,
    registerdoctor,
    registerpatient,
};