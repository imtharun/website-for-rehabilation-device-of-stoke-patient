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
function connect()
{
    con.connect(function(err) 
    {
        if (err) throw err;
        console.log("database Connected!");
    });
}


function authorise(username , password)
{
    let results;
    sql = 'SELECT password from auth where user_id = ?';
    const value = [username];
    console.log(value);
    con.query(sql,value,(err,result)=>
    {
        if(result.length===0)
        {
            results = "denied";
            callback(err,results);
            return;
        }
        else
        {
        const  resultArray = Object.values(JSON.parse(JSON.stringify(result))[0])[0];
        if(password === resultArray)
        {
            results = "granted";
        }
        else
        {
            results = "denied";
        }
        callback(err,results);
    }
    })
}

function createuser(username,password){

}


module.exports = {
    authorise,
    createuser,

};