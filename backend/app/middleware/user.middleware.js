/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * @description     : Receives data from previous middleware in the user routes                
 * 
 * @file            : user.middleware.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const { verifyToken } = require("../utility/user.jwt");

const validateUser = (req, res, next) => {
  //name validation
  let nameRegex = new RegExp("^[A-Z][a-zA-Z]{2,}");
  if (!nameRegex.test(req.body.name)) {
    return res.status(400).send({
      message:
        "First letter of name must be in uppercase and should be minimum of length 3",
    });
  }

  //age validation
  if (req.body.age < 1 || req.body.age > 100) {
    return res.status(400).send({
      message: "Enter the correct age",
    });
  }

  //phone number validation
  let phoneRegex = new RegExp("^([0-9]{0,3}?)[  ]?([234789]{1})([0-9]{9})$");
  if (!phoneRegex.test(req.body.phone)) {
    return res.status(400).send({
      message: "Enter a valid phone number",
    });
  }

  //email validation
  let emailRegex = new RegExp(
    "^[a-zA-Z0-9-_+]+(\\.?[a-zA-Z0-9-_]+)@[a-zA-Z0-9-_]+\\.[a-zA-Z]{2,}(\\.?[a-zA-Z-_]+)$"
  );
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).send({
      message: "Enter a valid email ID",
    });
  }
  next();
};



/**
 * @description function to verify user for authentication
 * @param {Object} req
 * @param {Object}  res
 * @param {Object} next
 * @returns
 */
 const authorizeUser = (req, res, next) => {
    const headerAuth = req.headers.authorization || req.headers.token;
    if (!headerAuth) return res.status(500).send({ message: "Not authorized" });
    // const token = headerAuth.split(" ")[1];
    const token = headerAuth
    verifyToken(token, (error, data) => {
      if (error){
        return next(
          createCustomError(
            "Error occurred while authenticating the user",
            500
          )
        );
      }  
      else{
        req.body.userId = data._id
        next()
      }
    });
  };
  
  module.exports = { validateUser, authorizeUser };
