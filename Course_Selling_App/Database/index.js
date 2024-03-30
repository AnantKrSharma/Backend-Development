const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('databaseURL');

// Define schemas

const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});


const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    purchasedCourses: [{
        // Each element in the array will be an ObjectId referencing a Course document from the Course collection.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});


const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    price: Number,
    imageLink: String
});


const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);


module.exports = {
    Admin,
    User,
    Course
}
