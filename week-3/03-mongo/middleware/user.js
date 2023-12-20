const mongodbreq=require("../db/index.js");



async function userMiddleware(req, res, next) {
    console.log(req.headers.username);
    console.log(req.headers.password);
const existingUser=await mongodbreq.User.exists({name:req.headers.username,password:req.headers.password});


if(existingUser==null)
{
    res.status(404).send();
    return;
}
next();
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
}

module.exports = userMiddleware;