const jwt = require('jsonwebtoken');
const z=require('zod');
const jwtPassword = 'secret';


/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */
const email=z.string().email();
const passSchema=z.string().min(6);

function signJwt(username, password) {
    if(email.safeParse(username).success && passSchema.safeParse(password).success)
    {
        var token = jwt.sign({ username: username }, jwtPassword);
       return token;
    }
    return null;
    
    // Your code here
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
// verifyJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFrc2hheWFAZ21haWwuY29tIiwiaWF0IjoxNzAzMDY4NTgzfQ.mLgQfz0oEp-VuMqMZn9Pcc6q7sGWRdR9SjD4O-iWD7k");
function verifyJwt(token) {
    return jwt.verify(token,jwtPassword,(err,decoded)=>
    {
        if(err)
        {
            console.log(err);
            return false;
        }
        // if(decoded==undefined)
        // {
        //     return false;
        // }else{
        //     return true;
        // }
        return true;
    });


    // try{
    // const verify=jwt.verify(token,jwtPassword);
    // }
    // catch(err)
    // {
    //     return false;
    // }
    // return true;
    // Your code here
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    const verify=jwt.decode(token,jwtPassword);
    if(verify)
    {
        return true;
    }
    return false;
    // Your code here
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
