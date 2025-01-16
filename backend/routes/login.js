const express = require("express");
const router = express.Router();
const Patient = require("../model/user");
const { check, validationResult } = require("express-validator");
const cors = require("cors");
const bcrypt = require("bcryptjs");

router.post(
  "/login",
  [check("email", "Please enter a valid email").isEmail()],
  async (req, res) => {
    const { email, password } = req.body;
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    try {
      const user = await Patient.find({ email: email });
      if (user.length === 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user[0].password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      } else {
        res
          .status(200)
          .json({ success: true, msg: "Login successful!", user: user[0] });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
