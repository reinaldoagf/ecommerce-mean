const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports.verifyJwtToken = (req, res, next) => {
  var token;
  if ("authorization" in req.headers)
    token = req.headers["authorization"].split(" ")[1];

  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });
  else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Token authentication failed." });
      else {
        req._id = decoded._id;
        next();
      }
    });
  }
};
module.exports.isAdmin =  (req, res, next) => {
  var token;
  if ("authorization" in req.headers)
    token = req.headers["authorization"].split(" ")[1];

  if (!token)
    return res
      .status(403)
      .send({ auth: false, message: "No token provided." });
  else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Token authentication failed." });
      else {
        req._id = decoded._id;
        User.findOne({ _id: decoded._id })
          .then(result => {
            if (result) {
              if (result.role == "admin") {
                next();
              }
              return res
                .status(403)
                .send({
                  auth: false,
                  message: "Unauthorized resource."
                });
            } else {
              console.log("No document matches the provided query.");
            }
            return result;
          })
          .catch(err =>
            console.error(`Failed to find document: ${err}`)
          );
      }
    });
  }
};
