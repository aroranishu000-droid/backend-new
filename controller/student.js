const connectDB = require("../database/db.js");
const { sendEmail } = require("./email.js");

// =========================
// GET API
// =========================

const getstudentdata = async (req, res) => {
    try {
        console.log("db")
        const db = await connectDB();
         console.log("db")
        const student = db.collection("student");
console.log(student)
        const result = await student.find({}).toArray();

        res.send({
            status: 200,
            message: "Student data retrieved successfully",
            data: result
        });

    } catch (error) {
        res.send({
            status: 500,
            message: "Error retrieving Student data",
            error: error.message
        });
    }
};


// =========================
// POST API
// =========================

const poststudentdata = async (req, res) => {
    try {

        console.log(req.body);

        const db = await connectDB();

        const student = db.collection("student");

        const result = await student.insertOne(req.body);

        if (result.acknowledged === true) {

            // Send email notification
            const emailSent = await sendEmail(
                req.body.email,
                "Student Data Added",
                `Hello ${req.body.name}, your data has been added successfully.`
            );

            res.send({
                status: 200,
                message: "Student data added successfully",
                data: result
            });

        } else {

            res.send({
                status: 400,
                message: "Failed to add student data",
                data: result
            });
        }

    } catch (error) {

        res.send({
            status: 500,
            message: "Error adding student data",
            error: error.message
        });
    }
};



// PUT API
// PUT API
const updatestudentdata = async (req, res) => {
    try {

        const studentId = String(req.params.id);

        console.log("Student ID:", studentId);
        console.log("Body:", req.body);
        console.log("File:", req.file);

        const db = await connectDB();
        const student = db.collection("student");

        const updatedData = {
            ...req.body
        };

        // If a new image was selected
        if (req.file) {
            updatedData.photo = req.file.filename;
        }

        const result = await student.updateOne(
            { id: studentId },
            { $set: updatedData }
        );

        console.log("UPDATE RESULT:", result);

        if (result.matchedCount === 0) {
            return res.status(404).send({
                status: 404,
                message: "Student not found",
                studentId: studentId
            });
        }

        return res.status(200).send({
            status: 200,
            message: "Student data updated successfully",
            data: updatedData,
            recordid: studentId
        });

    } catch (error) {

        console.log("UPDATE ERROR:", error);

        return res.status(500).send({
            status: 500,
            message: "Error updating student data",
            error: error.message
        });
    }
};
// DELETE API
const deletestudentdata = async (req, res) => {
    try {

        const db = await connectDB();
        const student = db.collection("student");

        // Keep ID as STRING because MongoDB stores id as string
        const studentId = String(req.query.id);

        console.log("Student ID received:", studentId);
        console.log("Student ID type:", typeof studentId);

        if (!studentId || studentId === "undefined") {
            return res.send({
                status: 400,
                message: "Please provide a valid student ID"
            });
        }

        const result = await student.deleteOne({
            id: studentId
        });

        console.log("DELETE RESULT:", result);

        if (result.deletedCount === 1) {

            return res.send({
                status: 200,
                message: "Student data deleted successfully",
                studentId: studentId
            });

        } else {

            return res.send({
                status: 404,
                message: "Student not found",
                studentId: studentId
            });
        }

    } catch (error) {

        console.log("DELETE ERROR:", error);

        return res.send({
            status: 500,
            message: "Error deleting student data",
            error: error.message
        });
    }
};

module.exports = {
    getstudentdata,
    poststudentdata,
    updatestudentdata,
    deletestudentdata
};