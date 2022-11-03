const mysql = require('mysql');
const config = require('./config_sql');
const hash = require('../helper/hasher');
const con = mysql.createConnection({
    host: config.host,
    user: config.uname,
    password: config.upass,
    database: config.database
});
connect();

function connect(){
    con.connect(function(err){
        if (err) throw err;
        console.log("MYsql Connected!");
    });
}

function authorise(email,password,callback){
    let results;
    sql = 'select user_id,cat from auth where user_name = ? and password = ?';
    const value = [email,password];
    con.query(sql,value,(err,result)=>
    {
        if(result===[] || result===undefined || result.length===0)
        {
            results = {"access":"denied"};
            callback(err,results);
            return;
        }
        else{
            var data = JSON.parse(JSON.stringify(result));
            results = {"access":"granted",
            "userid":data[0].user_id,
            "type":data[0].cat};
            callback(err,results);
        }
    
    })
}

function  registerauth(mail,password,usertype,callback){
    sql = "insert into AUTH values(null,?,?,?,?)";
    const sal = hash.hashpass(password);
    value = [mail,password,sal,usertype];
    console.log(value);
    con.query(sql,value,(err,result)=>{
        console.log("Auth table inserted");
    });
    console.log("registered auth");
    sql = "select user_id from AUTH Where user_name=?";
    value = [mail];
    con.query(sql,value,(err,result)=>{
        var data = JSON.parse(JSON.stringify(result));
        console.log(data);
        var userid = data[0].user_id;
        callback(err,userid);
    })
}


//----------------------------------------------PATIENT----------------------------------------------

function registerpatient(uid,name, email, number,address, dob,docmail,callback){
    const sql = "insert into patient values(?,?,?,?,?,?,?,?);";
    value = [uid,email,name,null,address,dob,number,docmail];
    con.query(sql,value,(err,result)=>{
        callback(err,result);
    }); 
}

function dashboard_patient(patientid,callback){
    sql1 = "select s2.* from patient s1 inner join doctor s2 on s1.doctor_id = s2.doctor_id where s1.patient_id = ?";
    sql2 = "select s1.* from caretaker s1 inner join care_pat s2 on s1.caretaker_id = s2.caretaker_id where s2.patient_id=?";
    let card = {}
    const value = [patientid];
    con.query(sql1,value,(err,result)=>{
        card["doctor"] = result;
    })
    con.query(sql2,value,(err,result)=>{
        card["caretaker"] = result;
        callback(err,card);
    });
}


//----------------------------------------------DOCTOR----------------------------------------------

function registerdoctor(uid,name, email, number, address, dob,callback){
    sql = "insert into doctor values(?,?,?,?,?,?,?)";
    value = [uid,email,name,null,address,dob,number];
    console.log(value);
    con.query(sql,value,(err,result)=>{
        callback(err,result);
    });
}

function dashboard_doctor(doctorid,callback){ 
    sql = "select s1.patient_id ,s1.patient_name ,s1.patient_dob,s3.caretaker_name from patient s1 inner join care_pat s2 on s1.patient_id = s2.patient_id inner join caretaker s3 on s2.caretaker_id = s3.caretaker_id where s1.doctor_id=?";
    const value = [doctorid];
    con.query(sql,value,(err,result)=>{
        callback(err,result);
    })
}

// ----------------------------------------------CARETAKER----------------------------------------------

function registercaretaker(uid,name, email, number, address, dob,callback){
    sql = "insert into caretaker values(?,?,?,?,?,?,?)";
    value = [uid,email,name,null,address,dob,number];
    con.query(sql,value,(err,result)=>{
        callback(err,result);
    });   
}

function getcaretakerpatients(caretakerid,callback){
    sql = "SELECT  s1.* ,s2.caretaker_id ,s3.doctor_name FROM patient s1 Inner Join doctor s3 on s3.doctor_id=s1.doctor_id INNER JOIN care_pat s2 ON s1.patient_id = s2.patient_id where s2.caretaker_id=?";
    value = caretakerid;
    con.query(sql,value,(err,result)=>{
        callback(err,result);
    });
}

function linkcaretakerandpatient(caretakerid,patientid,callback){
    sql = "insert into care_pat values(?,?)";
    value = [caretakerid,patientid];
    con.query(sql,value,(err,result)=>{
        callback(err,result);
    });
}

function removecaretakerandpatient(caretakerid,patientid,callback){
    sql = "delete from care_pat where patient_id=? and caretaker_id=?";
    value = [patientid,caretakerid];
    con.query(sql,value,(err,result)=>{
        callback(err,result);
    });
}


module.exports = {
    authorise,
    dashboard_doctor,
    dashboard_patient,
    registercaretaker,
    registerdoctor,
    registerpatient,
    linkcaretakerandpatient,
    registerauth,
    getcaretakerpatients,
    removecaretakerandpatient,
};