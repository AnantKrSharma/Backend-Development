const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");

const { Course, User } = require("../Database");

const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../config')


// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    await User.create({
        username: username,
        password: password
    }).then(()=>{
        res.json({
            msg: "Successfully created user."
        })
    }).catch(()=>{
        res.json({
            msg:"User not created."
        })
    })
});


router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    const isValidated = User.findOne({username: username, password: password})
    
    if(isValidated){
        const token = jwt.sign({username: username}, jwtSecret)
        res.json({
            token
        })
    }
    else{
        res.json({
            msg: "Incorrect username and password"
        })
    }
    
});


router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try{
        const AllCourses = await Course.find({});
        res.json({
            AllCourses
        })
    }
    catch{
        res.json({
            msg:"Error occured."
        })
    }
});


router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username = req.username;
    const courseID = req.params.courseId

    const updated = await User.updateOne({username: username}, {
        $push:{
            purchasedCourses: courseID
        }
    })
    res.json({
        msg: "Succesfully purchased."
    })
});


router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username;
    const userID =await User.findOne({username: username})
    const coursesArr = userID.purchasedCourses;
    const userCourses = await Course.find({
        _id:{
            $in: coursesArr
        }
    })
    
    res.json({
        userCourses
    })
});

module.exports = router
