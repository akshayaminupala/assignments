const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const mongodbreq=require("../db/index.js");


// User Routes
router.post('/signup', (req, res) => {
    mongodbreq.User.create(
        {
            name:req.body.username,
            password:req.body.password,
            courses:[]
        }
        
    );
    res.json({message:'User created successfully'});
    // Implement user signup logic
});

router.get('/courses', async (req, res) => {
    const courses=await mongodbreq.Course.find({});
    res.json(courses);
    // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId=req.params.courseId;
    const userId=req.headers.username;
    const existingUser=await mongodbreq.User.findOne({name:userId});
    console.log(existingUser);
    console.log(courseId.toString());
    if(existingUser.courses.includes(courseId.toString()))
    {
        res.json({message:'Course Already Purchased'});
        return;
    }
    existingUser.courses.push(courseId.toString());
    existingUser.save();
    res.json({message:'Course Purchased Succesfully'});

    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const userId=req.headers.username;

    const existingUser=await mongodbreq.User.findOne({name:userId});
    const mycourse=existingUser.courses;
    var courses=await mongodbreq.Course.find({});
   courses=courses.filter((course)=>{
    if(mycourse.includes(course._id.toString()))
    {
        return true;
    }else{
        return false;
    }
   });
   console.log(courses);
   res.json(courses);
    // Implement fetching purchased courses logic
});
module.exports = router;