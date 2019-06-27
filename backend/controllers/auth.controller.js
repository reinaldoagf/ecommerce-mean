const mongoose = require("mongoose");
const passport = require("passport");

const User = mongoose.model("User");

module.exports.register = async (req, res, next) => {
    let user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    try{
      const doc=await user.save();
      res.status(200).send(doc);
    }catch(err){
      if (err.code == 11000)
          res.status(422).send(["Duplicate email adrress found."]);
      else return next(err);
    };
};

module.exports.authenticate = (req, res, next) => {
  // call for passport authentication
  passport.authenticate("local", (err, user, info) => {
    // error from passport middleware
    if (err) return res.status(400).json(err);
    // registered user
    else if (user) return res.status(200).json({ token: user.generateJwt() });
    // unknown user or wrong password
    else return res.status(404).json(info);
  })(req, res);
};

