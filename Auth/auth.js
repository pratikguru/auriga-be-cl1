const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const {
  registerValidation,
  loginValidation,
  deleteUserValidation,
} = require("../Validations/validation");
const authVerify = require("./verifyToken");

dotenv.config();

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    //Checking if the user is in the db.
    const emailExists = await User.findOne({
      email: req.body.email,
    });
    if (emailExists) {
      return res.status(400).send({ message: "User already exists!" });
    }

    // Hash passwords.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Creating a new user.
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      userType: req.body.userType,
      group: req.body.group,
    });
    try {
      const savedUser = await user.save();
      res.send({ id: savedUser["_id"], message: "OK" });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { error } = loginValidation(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    console.log(error.details);
  } else {
    //Checking if the user is in the db.
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      const validPass = await bcrypt.compare(req.body.password, user.password);

      if (validPass) {
        //Create and assign a token.
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res
          .status(200)
          .header("auth-token", token)
          .send({ token: token, message: "Login Successful!" });
      } else {
        res.status(400).send({ message: "Incorrect credentials." });
      }
    } else {
      return res.status(400).send({ message: "Incorrect credentials." });
    }
  }
});

router.delete("/delete", authVerify, async (req, res) => {
  const { error } = deleteUserValidation(req.body);
  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message);
  } else {
    try {
      const userInformation = await User.findOne({
        _id: req.user._id,
      });
      if (userInformation["userType"] === 1) {
        const deletedUser = await User.deleteOne({
          _id: req.body.id,
        });
        res.status(200).send({
          message:
            "OK, Authorized to delete account. Account has been deleted.",
          ...deletedUser,
        });
      } else {
        res.status(401).send({
          message:
            "Not authorized to delete account! Re-Login as privilidged user to delete account.",
        });
      }
    } catch (error) {
      res.status(400).send({ message: error });
    }
  }
});

module.exports = router;
