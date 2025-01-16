const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { check, validationResult } = require("express-validator");

cors();

router.post(
  "/signup",
  [
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters long and include one uppercase, lowercase, number, and special character"
    ).isStrongPassword(),
    check("name", "Name must be at least 3 characters and contain only letters")
      .isLength({ min: 3 })
      .matches(/^[A-Za-z\s]+$/),
    check("dateOfBirth", "Invalid date").isDate(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errorss: errors.array() });
    }

    const { email, dateOfBirth, password, name } = req.body;
    try {
      const user = await User.find({ email });
      if (user.length > 0) {
        console.log(user);

        return res
          .status(400)
          .json({ errorss: [{ msg: "User already exists" }] });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        dateOfBirth,
        email,
        password: hashedPassword,
        name,
      });

      await newUser.save();
      res.status(200).json({ msg: "User registered successfully!" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error/ signup");
    }
  }
);

module.exports = router;
