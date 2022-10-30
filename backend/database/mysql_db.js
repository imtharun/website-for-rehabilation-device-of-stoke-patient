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
            console.log(data)
            results = {"access":"granted",
            "userid":data[0].user_id,
            "type":data[0].cat};
            callback(err,results);
        }
    
    })
}

//registering the auth for the user
function registerauth(name,password,usertype,callback){
    sql = " Insert into AUTH values (null,?,AES_ENCRYPT(?,'PSG'),?,?)";
    const hashedpass = ()=>{
        return hash.hashpassword(password);
    };
    value = [name,password,hashedpass,usertype];
    con.query(sql,value,(err,result)=>{
        console.log("Auth table inserted");
    });
    console.log("registered auth");
    sql = "select user_id from AUTH Where user_name=?";
    value = [name];
    con.query(sql,value,(err,result)=>{
        var data = JSON.parse(JSON.stringify(result));
        var userid = data[0].user_id;
        callback(err,userid);
    })
}


//----------------------------------------------PATIENT----------------------------------------------


//register the respective users
function registerpatient(uid,name, email, number, password, address, dob,callback){
    const sql = "select * from patient";
    value = [name,email,number,password,address,dob];
    con.query(sql,value,(err,result)=>{
        callback(err,result);
    }); 
    console.log("registerpatient");
}

//dashboard functions
function dashboard_patient(patientid,callback){
    sql = "get patient dashboard data";
    const value = [patientid];
    con.query(sql,value,(err,result)=>{
        callback(err,result);
    })
}

function newsessionpatient(uid,callback){
    const sql = "add new patient session";
    value = [uid];
    con.query(sql,value,(err,res)=>{
        callback(err,res);
    });
}

function patientsessions(patientid,callback){
    const sql = "SELECT * FROM shoulder_1 where patient_id=? UNION all SELECT * FROM shoulder_2 where patient_id=? UNION  all SELECT * FROM shoulder_3 where patient_id=? UNION  all SELECT * FROM elbow where patient_id=? UNION  all SELECT * FROM wrist where patient_id=?  order by session_no desc";
    const value = [patientid,patientid,patientid,patientid,patientid];
    con.query(sql,value,(err,result)=>{
        callback(err,result);
        console.log(result[0].id);
    });
}


//----------------------------------------------DOCTOR----------------------------------------------

function registerdoctor(uid,name, email, number, password, address, dob,callback){
    sql = "insert into doctor values(?,?,?,null,?,?,?)";
    const hashedpass = ()=>{
        return hash.hashpassword(password);
    };
    value = [];
    con.query(sql,value,(err,result)=>{
        callback(err,result);
        console.log('====================================');
        console.log(result);
        console.log('====================================');
    });
    console.log("registerdoctor");
}

function dashboard_doctor(doctorid,callback){ 
    sql = "get doctor dashboard data";
    const value = [doctorid];
    con.query(sql,value,(err,result)=>{
        callback(err,result);
    })
}


function linkdoctorandpatient(doctorid,patientid,callback){
    sql = "update patient set doctor_id = ? where patient_id = ?";
    value = [doctorid,patientid];
    con.query(sql,value,(err,result)=>{
        callback(err,result);
    });
}

function getdoctorpatients(doctorid,callback){
    sql = "select name from patient where doctor_id = ?";
    value = doctorid;
    con.query(sql,value,(err,result)=>{
        callback(err,result);
    });
}

//----------------------------------------------CARETAKER----------------------------------------------

function registercaretaker(uid,name, email, number, password, address, dob,callback){
    sql = "select * from patient";
    value = [name,email,number,password,address,dob];
    con.query(sql,value,(err,result)=>{
        callback(err,result);
    });   
    console.log("registercaretaker");
}

function dashboard_caretaker(caretakerid,callback){
    sql = "get caretaker dashboard data";
    const value = [caretakerid];
    con.query(sql,value,(err,result)=>{
        callback(err,result);
    })
}



function getcaretakerpatients(caretakerid,callback){
    sql = "select name from patient where caretaker_id = ?";
    value = caretakerid;
    con.query(sql,value,(err,result)=>{
        callback(err,result);
    });
}

function linkcaretakerandpatient(caretakerid,patientid,callback){
    sql = "update patient set caretaker_id = ? where patient_id = ?";
    value = [caretakerid,patientid];
    con.query(sql,value,(err,result)=>{
        callback(err,result);
    });
}





module.exports = {
    authorise,
    dashboard_caretaker,
    dashboard_doctor,
    dashboard_patient,
    registercaretaker,
    registerdoctor,
    registerpatient,
    linkcaretakerandpatient,
    linkdoctorandpatient,
    registerauth,
    getdoctorpatients,
    getcaretakerpatients,
    patientsessions,

};