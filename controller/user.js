
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

        const { userid, username, email, password } = req.body;

        const db = await connectDB();
        const user = db.collection("user");

        const data = {
            userid: userid,
            username: username,
            email: email,
            password: password
        };

        const result = await user.insertOne(data);

        await em.sendEmail(
            req.body.email,
            "User Registration Successfully",
            "User registered successfully."
        );

        res.send({
            status: 200,
            message: "User data inserted successfully",
            data: result
        });

    } catch (error) {

        res.send({
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
