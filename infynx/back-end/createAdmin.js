require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./Models/Admin");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const hash = await bcrypt.hash("Admin@123", 10);

    await Admin.create({
      username: "info@dnispl.com",
      password: hash,
    });

    console.log("✅ Admin Created Successfully");

    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });