const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';

async function userMiddleware(req, res, next) {
    const wholetoken=req.headers.authorization;
    token=wholetoken.split(" ")[1];
    console.log(token);
    try{
    await jwt.verify(token,jwtPassword);
    next();
    }catch(err)
    {
        res.status(404);
        console.log(err);
        return;
    }
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
}


module.exports = userMiddleware;