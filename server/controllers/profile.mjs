import { User } from "../models/user.mjs";
import { Department } from "../models/department.mjs";
import { Role } from "../models/role.mjs";
import jwt from "jsonwebtoken";

//Update User's Name
export const changeName = async (req, res) => {
  try {
    let userDecoded = jwt.verify(req.auth_user, "TEST");

    //find user from jwt
    let user = await User.findOne({ _id: userDecoded._id });

    //check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //set name from request body
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;

    //save user
    await user.save();

    //set up role
    let role = await Role.findById(user.role);
    let department = await Department.findById(user.department);

    //setup user data
    const userData = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      department: department.name,
      email: user.email,
      role: role.name,
      background_color: user.background_color,
    };

    res.status(200).json({
      success: false,
      message: "Updated Name infomation.",
      user: userData,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Name failed to update." });
  }
};

//Update User Password
export const changePassword = async (req, res) => {
  try {
    let userDecoded = jwt.verify(req.auth_user, "TEST");

    //find user from jwt
    let user = await User.findOne({ _id: userDecoded._id });

    //check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //initalize and declare passwords
    let oldPassword = req.body.current_password;
    let confrimPassword = req.body.confirm_password;

    //check if password is valid
    if (!user.isPasswordValid(oldPassword)) {
      return res.status(403).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // if (oldPassword != confrimPassword) {
    //   //check old and confirm password
    //   return res
    //     .status(409)
    //     .json({ success: false, message: "Passwords do not match" });
    // }

    //create new hash and salt
    user.createPassword(req.body.new_password);

    //save user
    await user.save();

    res.status(200).json({
      success: false,
      message: "Successfully updated password infomation.",
      user: userData,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Password failed to update." });
  }
};
