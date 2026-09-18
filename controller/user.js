
const connectDB = require("../database/db.js");
const em= require("./email.js");



// =========================
// GET API
// =========================

const getuserdata = async (req, res) => {
    try {

        const db = await connectDB();
        const user = db.collection("user");

        const result = await user.find({}).toArray();

        res.send({
            status: 200,
            message: "User data retrieved successfully",
            data: result
        });

    } catch (error) {

        res.send({
            status: 500,
            message: "Error retrieving User data",
            error: error.message
        });
    }
};


// =========================
// POST API
// =========================

const postuserdata = async (req, res) => {
    try {

        const {
            firstname,
            lastname,
            email,
            password
        } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).send({
                status: 400,
                message: "Please fill all fields"
            });
        }

        const db = await connectDB();
        const user = db.collection("user");

        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        };

        const result = await user.insertOne(data);

        if (result.acknowledged) {

            const emailSent = await em.sendEmail(
                email,
                "EduTech - Registration Successful",
                `Hello ${firstname} ${lastname},

Your EduTech account has been created successfully.

Email: ${email}

Thank you,
EduTech Team`
            );

            if (emailSent) {

                return res.status(201).send({
                    status: 201,
                    message: "User registered successfully and email sent",
                    data: result
                });

            } else {

                return res.status(201).send({
                    status: 201,
                    message: "User registered successfully, but email could not be sent",
                    data: result
                });
            }
        }

    } catch (error) {

        console.log("Signup Error:", error);

        res.status(500).send({
            status: 500,
            message: "Error adding user data",
            error: error.message
        });
    }
};



// =========================
// PUT API
// =========================

const updateuserdata = async (req, res) => {
    try {

        const userId = parseInt(req.params.id);
        const updatedData = req.body;

        const db = await connectDB();

        const user = db.collection("user");

        const result = await user.updateOne(
            { id: userId },
            { $set: updatedData }
        );

        if (result.modifiedCount > 0) {

            res.send({
                status: 200,
                message: "User data updated successfully",
                data: updatedData,
                recordid: userId
            });

        } else {

            res.send({
                status: 404,
                message: "Failed to update user data",
                data: result
            });
        }

    } catch (error) {

        res.send({
            status: 500,
            message: "Error updating user data",
            error: error.message
        });
    }
};


// =========================
// DELETE API
// =========================

const deleteuserdata = async (req, res) => {
    try {

        const userId = parseInt(req.query.id);

        const db = await connectDB();

        const user = db.collection("user");

        const result = await user.deleteOne({
            id: userId
        });

        if (result.deletedCount > 0) {

            res.send({
                status: 200,
                message: "User data deleted successfully",
                recordid: userId
            });

        } else {

            res.send({
                status: 404,
                message: "Failed to delete user data",
                data: result
            });
        }

    } catch (error) {

        res.send({
            status: 500,
            message: "Error deleting user data",
            error: error.message
        });
    }
};


module.exports = {
    getuserdata,
    postuserdata,
    updateuserdata,
    deleteuserdata
};
