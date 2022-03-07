require('dotenv').config();
const Users = require('./model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create and Save a new Note
const create = async (req, res, next) => {
    try{
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({
                message: "Content can not be empty"
            });
        }
        //Encrypt password
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        let result = {};
        const data = await Users.findOne({email: req.body.email});
        if (data && data.isRegistered){
            result = await Users.findOneAndUpdate({email: data.email}, req.body)
        } else {
            // Create a Note
            req.body.isRegistered = true;
            result = await Users.create(req.body);
        }
        if (result){
            res.status(201).send(result);
        } else {
            res.status(400).send({
                message: "Some error occurred while creating the user."
            });
        }
    } catch (e) {
        next(e)
    }
};

//login data
const login = async (req, res, next) => {
    try{
        const result = await Users.findOne({email: req.body.email});
        if (result){
            const isMatch = bcrypt.compareSync(req.body.password, result.password);
            if (isMatch) {
                const token = jwt.sign({email: req.body.email}, process.env.SECRET_KEY);
                return  res.status(200).send({result, auth:true, token:token, email: req.body.email });
            } else {
                return res.status(404).send({message: "Not valid details"});
            }
        } else {
            res.status(400).send({
                message: "Some error occurred while retrieving login."
            });
        }
    } catch (e) {
        next(e)
    }
};

module.exports = { create, login };