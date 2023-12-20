// Middleware for handling auth
const mongodbreq=require("../db/index.js");

async function adminMiddleware(req, res, next) {
    console.log(req.headers.username);
    console.log(req.headers.password);
const existingUser=await mongodbreq.Admin.findOne({name:req.headers.username,password:req.headers.password});
console.log(existingUser);
if(existingUser==null)
{
    res.status(404).send();
    return;
}
next();
// Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
}

module.exports = adminMiddleware;