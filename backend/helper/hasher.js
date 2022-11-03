const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashpass = (password)=>{
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

async function comparepassword(password,hash){
    const result = bcrypt.compareSync(password, hash);
    return result;
}

module.exports = {
    comparepassword,
    hashpass
}