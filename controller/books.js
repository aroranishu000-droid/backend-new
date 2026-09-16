
const connectDB = require("../database/db.js");

// GET API
const getbooksdata = async (req, res) => {
  try {
    const db = await connectDB();

    const books = db.collection("books");

    const result = await books.find({}).toArray();

    res.send({
      status: 200,
      data: result
    });
  } catch (error) {
    res.send({
      status: 500,
      message: "Error retrieving books data",
      error: error.message
    });
  }
};


// POST API
const postbooksdata = async (req, res) => {
  try {
    console.log(req.body);

    const db = await connectDB();

    const books = db.collection("books");

    const result = await books.insertOne(req.body);

    if (result.acknowledged === true) {
      res.send({
        status: 200,
        message: "Book data added successfully",
        data: result
      });
    } else {
      res.send({
        status: 400,
        message: "Failed to add book data",
        data: result
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: "Error adding book data",
      error: error.message
    });
  }
};


const updatebooksdata = async (req, res) => {
  try {
    const bookId =parseInt(req.params.id);

    const updatedData = req.body;

    const db = await connectDB();

    const books = db.collection("books");

    const result = await books.updateOne(
      { bookId: bookId },
      { $set: updatedData }
    );

    if (result.modifiedCount > 0) {
      res.send({
        status: 200,
        message: "Book data updated successfully",
        data: updatedData,
        recordid: bookId
      });
    } else {
      res.send({
        status: 404,
        message: "Book not found or no changes made",
        data: result
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: "Error updating book data",
      error: error.message
    });
  }
};


// // DELETE API
// const deletebooksdata = async (req, res) => {
//   try {
//     const bookId = parseInt(req.query.id);

//     const db = await connectDB();

//     const books = db.collection("books");

//     const result = await books.deleteOne({
//       bookId: bookId
//     });

//     if (result.deletedCount > 0) {
//       res.send({
//         status: 200,
//         message: "Book data deleted successfully",
//         recordid: bookId
//       });
//     } else {
//       res.send({
//         status: 404,
//         message: "Book not found",
//         data: result
//       });
//     }
//   } catch (error) {
//     res.send({
//       status: 500,
//       message: "Error deleting book data",
//       error: error.message
//     });
//   }
// };

// DELETE BOOK BY NAME

const deletebookname = async (req, res) => {
  try {
    const name = req.query.name;

    const db = await connectDB();
    const books = db.collection("books");

    const result = await books.deleteOne({
      bookName: name
    });

    if (result.deletedCount > 0) {
      res.send({
        status: 200,
        message: "Book deleted successfully",
        bookName: name
      });
    } else {
      res.send({
        status: 404,
        message: "Book not found",
        data: result
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: "Error deleting book",
      error: error.message
    });
  }
};

module.exports = {
  getbooksdata,
  postbooksdata,
  updatebooksdata,
 // deletebooksdata,
  deletebookname
};

