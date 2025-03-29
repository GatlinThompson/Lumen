import { Department } from "../models/department.mjs";
import { Role } from "../models/role.mjs";
import { User } from "../models/user.mjs";
import jwt from "jsonwebtoken";

// Create User api function
export const registerUser = async (req, res) => {
  try {
    //get default employee role
    let role = await Role.findOne({ name: "employee" });
    let department = await Department.findOne({ name: "New Hire" });

    //set up new user
    let user = new User();

    // user infomation
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.createPassword(req.body.password);
    user.email = req.body.email;
    user.department = department._id;
    user.role = role._id;

    await user.save(); // save user

    res
      .status(200)
      .json({ success: true, message: "User creation was successful" });
  } catch (err) {
    // if email is already been taken
    if (err.code == 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Email has already been taken" });
    }

    // server error
    res
      .status(500)
      .json({ success: false, message: "User creation was unsuccessful" });
  }
};

//Sign in user function
export const signInUser = async (req, res) => {
  try {
    //check user for
    let user = await User.findOne({ email: req.body.email });

    //if user doesnt exist return response
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    //check if user is not active
    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        message: "This account has been deactivated.",
      });
    }

    //if user exist validate password
    if (user.isPasswordValid(req.body.password)) {
      let token = user.generateJWT(); // create token for user
      //get all base user infomation

      let role = await Role.findById(user.role);
      let department = await Department.findById(user.department);

      //set up user data to send back
      const userData = {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        department: department.name,
        email: user.email,
        role: role.name,
        background_color: user.background_color,
      };
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 1000 * 60 * 60 * 24 * 3,
      });
      res.status(200).json({
        success: true,
        message: "User sign in was successful",
        user: userData,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal login error occured." });
  }
};

//logout
export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal login error occured." });
  }
};

//verify user
export const verifiedLoggedInUser = async (req, res) => {
  try {
    let userDecoded = jwt.verify(req.cookies.token, "TEST");

    //get all base user infomation
    let user = await User.findById(userDecoded._id);
    let role = await Role.findById(userDecoded.role);
    let department = await Department.findById(userDecoded.department);

    //set up user data to send back
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
      success: true,
      message: "User infomation obtained",
      user: userData,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal error has occured." });
  }
};

/**Admin User Methods**************************************************/

// Admin User Creation method
export const createUser = async (req, res) => {
  try {
    //set up new user
    let user = new User();

    // user infomation
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.role = req.body.role;
    user.department = req.body.department;
    user.createPassword(req.body.temp_password);

    //check if trainer
    let trainerRole = await Role.findOne({ name: "trainer" });
    if (req.body.role == trainerRole._id) {
      //get training department
      let dept = await Department.findOne({ name: "Training" });
      user.department = dept._id;
    }

    //check if admin
    let adminRole = await Role.findOne({ name: "admin" });
    if (req.body.role === adminRole._id) {
      //get HR department
      let dept = await Department.findOne({ name: "Human Resources" });

      user.department = dept._id;
    }

    await user.save(); // save user

    res
      .status(200)
      .json({ success: true, message: "User creation was successful" });
  } catch (err) {
    if (err.code == 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Email has already been taken" });
    }
    res
      .status(500)
      .json({ success: false, message: "User creation was unsuccessful" });
  }
};

//Edit User
export const editUser = async (req, res) => {
  try {
    //get user
    let user = await User.findById(req.params.id);

    //set department and role
    user.role = req.body.role;
    user.department = req.body.department;
    //possible is active here

    //save user
    await user.save();

    res.status(200).json({
      success: true,
      message: "User edit was successful",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "User edit was unsuccessful" });
  }
};

//Delete User
export const deleteUser = async (req, res) => {
  try {
    //get user
    let user = await User.findById(req.params.id);

    //archive user
    user.is_active = false;

    res.status(200).json({
      success: true,
      message: "User edit was successful",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "User deletion was unsuccessful" });
  }
};

//Admin See Users

//get user based on role
const getRoleSpecificUser = (usersRole) => async (req, res) => {
  try {
    //get role
    let role = await Role.findOne({ name: usersRole });

    //get role specific users
    let users = await User.find({ role: role._id, is_active: true }).select(
      "-hash -salt"
    );

    res.status(200).json({
      success: true,
      message: `Server Success: Obtained all ${usersRole}s`,
      users: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server error, unable to get ${usersRole}s`,
    });
  }
};

export const getManagers = getRoleSpecificUser("manager");
export const getTrainers = getRoleSpecificUser("trainer");
export const getEmployees = getRoleSpecificUser("employee");

//Admin Get All Users
export const getAllUsers = async (req, res) => {
  try {
    //get super admin role
    let superAdmin = await Role.find({ name: "super_admin" });

    //get users besides super admin
    let users = await User.find({
      role: { $ne: superAdmin._id },
      is_active: true,
    })
      .populate({ path: "role" })
      .populate({ path: "department" })
      .select("-hash -salt")
      .sort({ "department.name": 1 });

    //sort by department and then first name
    users.sort((a, b) => {
      //sort by department
      if (a.department.name < b.department.name) {
        return -1;
      }
      if (a.department.name > b.department.name) {
        return 1;
      }

      //then sort by first name
      if (a.first_name < b.first_name) {
        return -1;
      }
      if (a.first_name > b.first_name) {
        return 1;
      }

      return 0;
    });

    const managers = users.filter((user) => user.role.name === "manager");
    const trainers = users.filter((user) => user.role.name === "trainer");
    const employees = users.filter((user) => user.role.name === "employee");

    console.log("Managers:", managers.length);
    console.log("Trainers:", trainers.length);
    console.log("Employees:", employees.length);

    const userData = {
      employees: employees,
      trainers: trainers,
      managers: managers,
    };

    res.status(200).json({
      success: true,
      message: "Server Success: Obtained all users",
      users: userData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error, unable to get users",
      err: err.message,
    });
  }
};
