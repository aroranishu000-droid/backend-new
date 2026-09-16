const express = require('express');

const router = express.Router();

const st = require('../controller/student.js');

const teacher = require('../controller/teacher.js');

const course = require('../controller/course.js');

const books = require('../controller/books.js');
  
// ==================== STUDENT APIs ====================
router.get("/home", (req, res) => {

    res.render("home", {
        name: "Nishu. 54454554"}
);

});

router.get("/studentlist", (req, res) => {
const listnew = [
        {
            id: 101,
            name: "Rahul Sharma",
            age: 20,
            course: "JavaScript",
            email: "rahul@gmail.com",
            city: "Delhi",
            marks: 85
        },
        {
            id: 102,
            name: "Priya Singh",
            age: 21,
            course: "React",
            email: "priya@gmail.com",
            city: "Noida",
            marks: 90
        },
        {
            id: 103,
            name: "Amit Kumar",
            age: 22,
            course: "Node.js",
            email: "amit@gmail.com",
            city: "Gurgaon",
            marks: 78
        }
    ];
    res.render("student", {listnew})


});
router.get('/getdata', st.getstudentdata);

router.post('/postdata', st.poststudentdata);

router.put('/updatedata/:id', st.updatestudentdata);

router.delete('/deletedata', st.deletestudentdata);


// ==================== TEACHER APIs ====================

router.get('/getteacherdata', teacher.getteacherdata);

router.post('/postteacherdata', teacher.postteacherdata);      

router.put('/updateteacherdata/:id', teacher.updateteacherdata); 

router.delete('/deleteteacherdata', teacher.deleteteacherdata);


// ==================== COURSE APIs ====================

router.get('/getcoursedata', course.getcoursedata);

router.post('/postcoursedata', course.postcoursedata);

router.put('/updatecoursedata/:id', course.updatecoursedata);

router.delete('/deletecoursedata', course.deletecoursedata);

// ==================== BOOKS APIs ====================

router.get('/getbooksdata',books.getbooksdata);

router.post('/postbooksdata',books.postbooksdata);

router.put('/updatebooksdata/:id',books.updatebooksdata);

//router.delete('/deletebooksdata',books.deletebooksdata);

router.delete('/deletebookname', books.deletebookname);



module.exports = router;