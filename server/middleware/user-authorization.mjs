import { User } from "../models/user.mjs";
import { Role } from "../models/role.mjs";
import jwt from "jsonwebtoken";

//User Role Validation Method for Each Role
const checkUserRole = (userRole) => async (req, res, next) => {
  try {
    //check if jwt is valid
    if (jwt.verify(req.cookies.token, "TEST")) {
      //get user info from jwt

      console.log("Gello");
      let userDecoded = jwt.verify(req.cookies.token, "TEST");

      //get role of user
      let role = await Role.findOne({ name: userRole });
      //find user who has user role based on jwt
      let user = await User.findById(userDecoded._id).populate({
        path: "role",
        match: { name: userRole },
      });

      //check is role and user combo exist
      if (user && role._id == userDecoded.role) {
        next(); //middleware is good to go forward
      } else {
        //not valid role for api call
        res.status(403).json({
          success: false,
          message: "Authication Error: Permission is denied.",
        });
      }
    } else {
      // couldnt verify web token
      res.status(401).json({
        success: false,
        message: "Authication Error: Client failed to authenticate.",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Middleware Methods
export const isAdmin = checkUserRole("admin");
export const isManager = checkUserRole("manager");
export const isTrainer = checkUserRole("trainer");
export const isEmployee = checkUserRole("employee");
export const isSuperAdmin = checkUserRole("super_admin"); //super admin is for db changes

//simple extra step of security validating user
export const verifyUser = (req, res, next) => {
  try {
    if (jwt.verify(req.cookies.token, "TEST")) {
      next(); //continue getting user
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
