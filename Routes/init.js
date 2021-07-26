const router = require("express").Router();
const authVerify = require("../Auth/verifyToken");
const User = require("../Models/user");

router.get("/current_user", authVerify, async (req, res) => {
  const userInformation = await User.findOne({
    _id: req.user._id,
  });
  const { password, ...filteredUserInformation } = userInformation["_doc"];
  res.status(200).send({
    ...filteredUserInformation,
    message: `Greetings ${filteredUserInformation["firstName"]}`,
  });
});

router.get("/all_users", authVerify, async (req, res) => {
  try {
    const userList = await User.find();
    const usersInformation = userList.map((value, index) => ({
      _id: value._id,
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      userType: value.userType,
      group: value.group,
      date: value.date,
    }));
    console.log(usersInformation);
    if (usersInformation) {
      res.status(200).send({ ...usersInformation });
    } else {
      res.status(400).send({ message: "User retrieval error." });
    }
  } catch (error) {
    return res.status(400).send({ message: error });
  }
});

module.exports = router;
