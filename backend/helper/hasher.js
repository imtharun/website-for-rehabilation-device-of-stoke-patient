const bcrypt = require('bcrypt');
const saltRounds = 10;


function hashpassword(password){
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

async function comparepassword(password,hash){
    const result = bcrypt.compareSync(password, hash);
    return result;
}

module.exports = {
    hashpassword,
    comparepassword,
}