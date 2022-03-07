const Book = require('./model');

async function createBook(req, res, next){
  try{
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({
        message: "Content can not be empty"
      });
    }
    const result = new Book(req.body);
    await result.save();
    result.save(function(err, result) {
      if(err) throw err;
      res.status(200).send(result);
    });
  } catch (e) {
    next(e);
  }
};

async function getAllBook(req, res, next){
  try{
    const { skip = 0, limit = 0 } = req.body;
    const count = await Book.countDocuments({isDeleted: false});
    const data = await Book.find({isDeleted: false}).skip(skip).limit(limit).lean();
    if (data) {
      res.status(200).send({data, totalCount: count});
    } else {
      res.status(400).send({
        message: "Some error occurred while retrieving data."
      });
    }
  } catch (e) {
    next(e);
  }
};

async function updateDetails(req, res, next){
  const _id = req.params.id;
  try{
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({
        message: "User content can not be empty"
      });
    }
    const data = await Book.findByIdAndUpdate({_id}, req.body, {new: true});
    if (data) {
      res.status(201).send(data);
    } else {
      res.status(400).send({msg: "something went wrong"});
    }
  } catch (e) {
    next(e);
  }
};

async function remove(req, res, next) {
  const _id = req.params.id;
  try {
    const data = await Book.findByIdAndUpdate({ _id }, { isDeleted: true }, { new: true });
    if (data) {
      res.status(200).send({message: "Record deleted successfully!"});
    } else {
      res.status(400).send({message: "Something went wrong"});
    }
  } catch (e) {
    next(e);
  }
}

module.exports = { createBook, getAllBook, updateDetails, remove };
