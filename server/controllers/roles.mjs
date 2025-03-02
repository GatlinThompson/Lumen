import { Role } from "../models/role.mjs";
import { User } from "../models/user.mjs";

//CRUD Methods for Roles

//Create Role
export const createRole = async (req, res) => {
  try {
    let role = new Role(); // creat new role object
    role.name = req.body.name;
    await role.save(); // save role

    res.status(200).json({
      success: true,
      message: "Role creation successful",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//Edit Role
export const editRole = async (req, res) => {
  try {
    let role = await Role.findById(req.params.id); // get role object id

    //check if role exist
    if (role) {
      role.name = req.body.name; //set new name
      await role.save(); //save document

      res.status(200).json({
        success: true,
        message: "Role edit was successful",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Role doesn't exist",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//Delete Role
export const deleteRole = async (req, res) => {
  try {
    //get role id
    let oldRole = await Role.findById(req.params.id);

    // return not found error if role doesnt exist
    if (!oldRole) {
      return res.status(404).json({
        success: false,
        message: "Role doesn't exist",
      });
    }

    //find or create employee if it doesnt exist
    let newRole = await Role.findOne({ name: "employee" });

    //if employee role doesnt exist
    if (!newRole) {
      newRole = new Role();
      newRole.name = "employee";
      await newRole.save();
    }

    //update role to new role for users
    await User.updateMany({ role: oldRole._id }, { role: newRole._id });

    //delete role
    await Role.deleteOne({ _id: req.params.id });

    //return success message
    res.status(200).json({
      success: true,
      message: "Role deletion was successful",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//Read Roles
export const getAllRoles = async (req, res) => {
  try {
    let roles = await Role.find({ name: { $ne: "super_admin" } }); // get all roles besides super_admin

    res.status(200).json({
      success: true,
      message: "All roles obtained",
      roles: roles,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
