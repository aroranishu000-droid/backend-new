const express = require('express');

const router = express.Router();

const st = require('../controller/student.js');
const teacher = require('../controller/teacher.js');
const course = require('../controller/course.js');
const books = require('../controller/books.js');
const user = require('../controller/user.js');
const upload = require("../middleware/upload");

/**
 * @swagger
 * tags:
 *   - name: Students
 *     description: Student APIs
 *   - name: Teachers
 *     description: Teacher APIs
 *   - name: Courses
 *     description: Course APIs
 *   - name: Books
 *     description: Book APIs
 *   - name: Users
 *     description: User APIs
 *   - name: Login
 *     description: Login APIs
 */

// ==================== HOME ====================

router.get("/home", (req, res) => {
    res.render("home", {
        name: "Nishu. 54454554"
    });
});

// ==================== STUDENT APIs ====================

/**
 * @swagger
 * /getdata:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Student data retrieved successfully
 */
router.get('/getdata', st.getstudentdata);

/**
 * @swagger
 * /postdata:
 *   post:
 *     summary: Add a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               course:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *               marks:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Student added successfully
 */
router.post('/postdata', st.poststudentdata);

/**
 * @swagger
 * /updatedata/{id}:
 *   put:
 *     summary: Update student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Student updated successfully
 */
router.put(
    '/updatedata/:id',
    upload.single("photo"),
    st.updatestudentdata
);

/**
 * @swagger
 * /deletedata:
 *   delete:
 *     summary: Delete student
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Student deleted successfully
 */
router.delete('/deletedata', st.deletestudentdata);


// ==================== TEACHER APIs ====================

/**
 * @swagger
 * /getteacherdata:
 *   get:
 *     summary: Get all teachers
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: Teacher data retrieved successfully
 */
router.get('/getteacherdata', teacher.getteacherdata);

/**
 * @swagger
 * /postteacherdata:
 *   post:
 *     summary: Add a new teacher
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Teacher added successfully
 */
router.post('/postteacherdata', teacher.postteacherdata);

/**
 * @swagger
 * /updateteacherdata/{id}:
 *   put:
 *     summary: Update teacher
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 */
router.put('/updateteacherdata/:id', teacher.updateteacherdata);

/**
 * @swagger
 * /deleteteacherdata:
 *   delete:
 *     summary: Delete teacher
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 */
router.delete('/deleteteacherdata', teacher.deleteteacherdata);


// ==================== COURSE APIs ====================

/**
 * @swagger
 * /getcoursedata:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Course data retrieved successfully
 */
router.get('/getcoursedata', course.getcoursedata);

/**
 * @swagger
 * /postcoursedata:
 *   post:
 *     summary: Add a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Course added successfully
 */
router.post('/postcoursedata', course.postcoursedata);

/**
 * @swagger
 * /updatecoursedata/{id}:
 *   put:
 *     summary: Update course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Course updated successfully
 */
router.put('/updatecoursedata/:id', course.updatecoursedata);

/**
 * @swagger
 * /deletecoursedata:
 *   delete:
 *     summary: Delete course
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Course deleted successfully
 */
router.delete('/deletecoursedata', course.deletecoursedata);


// ==================== BOOKS APIs ====================

/**
 * @swagger
 * /getbooksdata:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Book data retrieved successfully
 */
router.get('/getbooksdata', books.getbooksdata);

/**
 * @swagger
 * /postbooksdata:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Book added successfully
 */
router.post('/postbooksdata', books.postbooksdata);

/**
 * @swagger
 * /updatebooksdata/{id}:
 *   put:
 *     summary: Update book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Book updated successfully
 */
router.put('/updatebooksdata/:id', books.updatebooksdata);

/**
 * @swagger
 * /deletebookname:
 *   delete:
 *     summary: Delete book
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Book deleted successfully
 */
router.delete('/deletebookname', books.deletebookname);


// ==================== USER APIs ====================

/**
 * @swagger
 * /getuserdata:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 */
router.get('/getuserdata', user.getuserdata);

/**
 * @swagger
 * /postuserdata:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.post('/postuserdata', user.postuserdata);

/**
 * @swagger
 * /updateuserdata/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put('/updateuserdata/:id', user.updateuserdata);

/**
 * @swagger
 * /deleteuserdata:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete('/deleteuserdata', user.deleteuserdata);


// ==================== LOGIN API ====================

/**
 * @swagger
 * /userlogin:
 *   post:
 *     summary: Login user
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 */
router.post("/userlogin", user.userlogin);



router.post("/uploadphoto", upload.single("photo"), (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            status: 400,
            message: "Please select a photo"
        });
    }

    res.status(200).json({
        status: 200,
        message: "Photo uploaded successfully",
        filename: req.file.filename
    });
});

module.exports = router;