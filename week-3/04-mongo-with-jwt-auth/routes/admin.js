const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const mongodbreq=require("../db/index.js");
const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';


// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    console.log(req.body.username);
    mongodbreq.Admin.create(
        {
            name:req.body.username,
            password:req.body.password,
        }
        
    );
    res.json({message:'Admin created successfully'});

});

router.post('/signin', async (req, res) => {
    const existingUser=await mongodbreq.Admin.findOne({name:req.body.username,password:req.body.password});
    var token=await jwt.sign({ username: existingUser.name }, jwtPassword);
    res.json(token);
    // Implement admin signup logic
});

router.post('/courses', adminMiddleware, async (req, res) => {
    
    // Implement course creation logic
    mongodbreq.Course.create(
        {
            title:req.body.title,
            description:req.body.description,
            price:req.body.price,
            imageLink:req.body.imageLink,
        }
    );
    res.json({'message':'course created succesfully'});
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses=await mongodbreq.Course.find({});
    res.json(courses);
});

module.exports = router;