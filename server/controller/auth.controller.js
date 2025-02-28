const db = require("../models");
const TryCatch = require("../utils/TryCatch");

const register = TryCatch(async (req, res, next) => {
  // data from body
  const { name, age, email, password } = req.body;

  // create user instance in db
  const user = await db.user.create({
    name,
    email,
    age,
    password,
  });

  return res
    .status(200)
    .json({ message: "account created", success: true, user });
});
const login = TryCatch(async (req, res, next) => {

    

  return res.status(200).json({ message: "logged in", success: true });
});

// module.exports = {login}
module.exports = { register, login };
