const mongoose = require('mongoose');
const password = encodeURIComponent("AkSh@1234");


// Connect to MongoDB
mongoose.connect(`mongodb+srv://akshaya:${password}@cluster0.xdm08en.mongodb.net/`);// Define schemas
const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
    // Schema definition here

});

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    courses:[{type:String}]
    // Schema definition here
});

const CourseSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    imageLink:String,
    // Schema definition here
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}