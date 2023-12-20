const { Router } = require("express");
const bodyParser = require('body-parser');

const adminMiddleware = require("../middleware/admin");
const mongodbreq=require("../db/index.js");
const router = Router();
// Admin Routes
router.post('/signup', (req, res) => {
    console.log(req.body.username);
    mongodbreq.Admin.create(
        {
            name:req.body.username,
            password:req.body.password,
        }
        
    );
    res.json({message:'Admin created successfully'});

    // Implement admin signup logic
});

router.post('/courses', adminMiddleware, (req, res) => {
    mongodbreq.Course.create(
        {
            title:req.body.title,
            description:req.body.description,
            price:req.body.price,
            imageLink:req.body.imageLink,
        }
    );
    res.json({'message':'course created succesfully'});
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const courses=await mongodbreq.Course.find({});
    res.json(courses);
    // Implement fetching all courses logic
});

module.exports = router;