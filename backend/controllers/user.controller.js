const mongoose = require("mongoose");
const _ = require("lodash");

const User = mongoose.model("User");

module.exports.findUser = async (req, res, next) => {
    try{
        const doc = await User.findById(req.params.id);
        res.status(200).send(doc);
    }catch(err){
        if (err.code == 11000)
          res.status(404).send(["User not found."]);
        else return next(err);
    }
};

module.exports.userProfile = async (req, res, next) => {
    try{
        const doc = await User.findOne({ _id: req._id });
        if (!doc)
        return res
            .status(404)
            .json({ status: false, message: "User record not found." });
        res.status(200).send(doc);
    }catch(err){
        if (err.code == 11000)
          res.status(404).send([err]);
        else return next(err);
    }
};


