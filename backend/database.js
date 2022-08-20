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


//used to check weather the user is authorised or not
function authorise(username,password,callback)
{
    let results;
    sql = 'SELECT password from auth where user_id = ?';
    const value = [username];
    console.log(value);
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


//create a new user
function createuser(username,password){

}


module.exports = {
    authorise,
    createuser,
    
};