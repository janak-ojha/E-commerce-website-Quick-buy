const jwt = require("jsonwebtoken");

const createNewToken = (payload) =>{
    return jwt.sign({useId: payload},process.env.SECRET_KEY,{expiresIn});
}
module.exports={createNewToken}