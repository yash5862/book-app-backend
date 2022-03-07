const Users = require('../auth/model');

async function getAllUsers(req, res, next){
    try {
        const { skip=0, limit=0 } = req.body;
        const count = await Users.countDocuments({isDeleted: false});
        const result = await Users.find({isDeleted: false}).skip(skip).limit(limit).lean();
        if (result) {
            res.status(200).send({result, totalCount: count});
        } else {
            res.status(400).send({
                message: "Some error occurred while retrieving data."
            });
        }
    } catch (e) {
        next(e);
    }
};

// Find a single userId with a
async function findUserData(req, res, next){
    try {
        const result = await Users.findOne({_id: req.params.id});
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(400).send({
                message: "Something went wrong "
            });
        }
    } catch (e) {
        next(e);
    }
};

// Update a user identified by the userId in the request
async function update(req, res, next){
// Validate Request
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }

        // Find user and update it with the request body
        const result = await Users.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});
        if (result) {
            res.status(201).send(result);
        } else {
            res.status(400).send({msg: "something went wrong"});
        }
    } catch (e) {
        next(e);
    }

};

// Delete a user with the specified userId in the request
async function deleteUser(req, res, next){
    try {
        const result = await Users.findByIdAndUpdate({_id: req.params.id}, {isDeleted: true}, {new: true});
        if (result) {
            res.status(200).send({message: "Record deleted successfully!"});
        } else {
            res.status(400).send({message: "Something went wrong"});
        }
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getAllUsers,
    findUserData,
    update,
    deleteUser
};