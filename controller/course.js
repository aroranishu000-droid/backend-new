const connectDB = require("../database/db.js");

// GET API
const getcoursedata = async (req, res) => {
   try {

    

    const db = await connectDB();

    const course = db.collection("course");

    const result = await course.find({}).toArray();

    res.send({
        status: 200,
        data: result
    });
}


catch(error){
     res.send({
        status: 500,
        message: "error retreiving student data",
        data: result
    });

}
};



// POST API
const postcoursedata = async (req, res) => {

   

    console.log(req.body);


    const db = await connectDB();

    const course = db.collection("course");

  

    const result = await course.insertOne(req.body);

    if(result.acknowledged==true)
{
    res.send({
        status: 200,
        message: "course data added successfully",
        data: result
    });
}
else
        res.send({
    status: 400,
        message: "failed to add course data",
        data: result

        });
    };;

// PUT API
const updatecoursedata = async (req, res) => {
    try {

        const courseId = req.params.id;
        const updatedData = req.body;

        const db = await connectDB();

        const course = db.collection("course");

        const result = await course.updateOne(
            { id: courseId },
            { $set: updatedData }
        );

        console.log("Update result:", result);

        if (result.modifiedCount > 0) {

            res.send({
                status: 200,
                message: "Course data updated successfully",
                data: updatedData,
                recordid: courseId
            });

        } else {

            res.send({
                status: 400,
                message: "Failed to update course data",
                data: result
            });
        }

    } catch (error) {

        res.send({
            status: 500,
            message: "Error updating course data",
            error: error.message
        });
    }
};

// DELETE API
const deletecoursedata = async (req, res) => {

    const courseId = req.query.id;
  console.log(courseId)
    const db = await connectDB();

    const course = db.collection("course");

    const result = await course.deleteOne({id:courseId
    });
   
    if (result.deletedCount > 0) {

        res.send({
            status: 200,
            message: "Course data deleted successfully",
            recordid: courseId
        });

    } else {

        res.send({
            status: 400,
            message: "Failed to delete course data",
            data: result
        });
    }
};

module.exports = {
    getcoursedata,
    postcoursedata,
    updatecoursedata,
    deletecoursedata
};