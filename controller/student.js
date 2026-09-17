const connectDB = require("../database/db.js");
const { sendEmail } = require("./email.js");

// =========================
// GET API
// =========================

const getstudentdata = async (req, res) => {
    try {
        const db = await connectDB();

        const student = db.collection("student");

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
const updatestudentdata = async(req, res) => {
try{

    const studentId =parseInt(req.params.id);
    const updatedData = req.body;
const db = await connectDB();

const student = db.collection("student");

 const result = await student.updateOne({ id: studentId },{ $set: req.body});
 if(result.modifiedCount>0)
 {

 
    res.send({
        status: 200,
        message: "Student data updated successfully",
        data: updatedData,
        recordid: studentId
    });
}
else
{
    res.send({
        status:200,
        message:'failed to update student data',
        data:result
    });
}
}
catch(error) {
    res.send({
        status:500,
        message: 'Error updating student data',
        error: error.message
    });
}
};


// DELETE API
const deletestudentdata = async(req, res) => {
const studentId =parseInt(req.query.id);
const db = await connectDB();

const student = db.collection("student");

 const result = await student.deleteOne({ id: studentId });

 if(result.deletedCount>0)
 {

    res.send({
        status: 200,
        message: "Student data deleted successfully",
        recordid: studentId
    });
}

else

 
{
    res.send({
        status:200,
        message:'failed to delete student data',
        data:result
    });
}
}



module.exports = {
    getstudentdata,
    poststudentdata,
    updatestudentdata,
    deletestudentdata
};