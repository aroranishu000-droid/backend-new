const connectDB = require("../database/db.js");

// GET API
const getteacherdata = async (req, res) => {

    try{

    
    const db = await connectDB();

    const teacher = db.collection("teacher");

    const result = await teacher.find({}).toArray();

    res.send({
        status: 200,
        data: result
    });
}


catch(error){
     res.send({
        status: 500,
        message: "error retreiving teacher data",
        data: result
    });

}
};




// POST API
const postteacherdata = async (req, res) => {

 

    console.log(req.body);

     const db = await connectDB();

    const teacher = db.collection("teacher");



    const result = await teacher.insertOne(req.body);

 if(result.acknowledged==true)
{
    res.send({
        status: 200,
        message: "teacher data added successfully",
        data: result
    });
}
else
        res.send({
    status: 400,
        message: "failed to add teacher data",
        data: result

        });
    };

    

const updateteacherdata = async (req, res) => {
  try {

    const teacherId = req.params.id;

    console.log("ID received:", teacherId);
    console.log("ID type:", typeof teacherId);

    const updatedData = req.body;

    const db = await connectDB();
    const teacher = db.collection("teacher");

    const result = await teacher.updateOne(
      { id: teacherId },
      { $set: updatedData }
    );

    console.log(result);

    if (result.matchedCount > 0) {

      res.send({
        status: 200,
        message: "Teacher data updated successfully",
        data: updatedData,
        recordid: teacherId
      });

    } else {

      res.send({
        status: 404,
        message: "Teacher with this ID not found",
        data: result
      });
    }

  } catch (error) {

    res.send({
      status: 500,
      message: "Error updating teacher data",
      error: error.message
    });
  }
};
// DELETE API
const deleteteacherdata = async (req, res) => {

    const teacherId = (req.query.a);

    const db = await connectDB();

    const teacher = db.collection("teacher");

    const result = await teacher.deleteOne({
        teaid: teacherId
    });

    if (result.deletedCount > 0) {

        res.send({
            status: 200,
            message: "Teacher data deleted successfully",
            recordid: teacherId
        });

    } else {

        res.send({
            status: 200,
            message: "Failed to delete teacher data",
            data: result
        });
    }
};

module.exports = {
    getteacherdata,
    postteacherdata,
    updateteacherdata,
    deleteteacherdata
};