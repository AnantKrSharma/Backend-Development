const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();

const {Admin, Course} = require('../Database/index')

const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../config')

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    Admin.create({
        username: username,
        password: password
    }).then(()=>{
        res.json({
            msg: "Admin created succesfully."
        })
    }).catch(()=>{
        res.json({
            msg:"Admin not created."
        })
    })
});


router.post('/signin', async (req, res) => {
    // Implement admin signin logic
    const username = req.headers.username;
    const password = req.headers.password;

    const isValidated = await Admin.findOne({username: username, password: password})
    if(isValidated){
        const Token = jwt.sign({username: username}, jwtSecret)
        res.json({
            Token
        });
    }
    else{
        res.status(403).json({
            msg:"Incorrect username and password."
        })
    }
});


router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    Course.create({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink
    }).then((newCourse)=>{
        res.json({
            msg: "Course created successfully",
            courseId : newCourse._id
        })
    })
});


router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({});
    res.json({
        allCourses
    })
});


module.exports = router;
