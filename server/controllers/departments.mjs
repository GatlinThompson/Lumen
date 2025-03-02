import { Department } from "../models/department.mjs";
import { User } from "../models/user.mjs";

// CRUD Methods for Departments

//Create Department
export const createDepartment = async (req, res) => {
  try {
    let department = new Department(); // creat new department object
    department.name = req.body.name;
    await department.save(); // save department

    res.status(200).json({
      success: true,
      message: "Department creation successful",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//Edit Department
export const editDepartment = async (req, res) => {
  try {
    let department = await Department.findById(req.params.id); // get department object id

    //check if department exist
    if (department) {
      department.name = req.body.name; //set new name
      await department.save(); //save document

      res.status(200).json({
        success: true,
        message: "Department edit was successful",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Department doesn't exist",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//Delete Department
export const deleteDepartment = async (req, res) => {
  try {
    //get department id
    let oldDepartment = await Department.findById(req.params.id);

    // return not found error if department doesnt exist
    if (!oldDepartment) {
      return res.status(404).json({
        success: false,
        message: "Department doesn't exist",
      });
    }

    //find or create transitioning department if it doesnt exist
    let newDepartment = await newDepartment.findOne({ name: "transitioning" });

    //if transitioning department doesnt exist
    if (!newDepartment) {
      newDepartment = new Role();
      newDepartment.name = "transitioning";
      await newDepartment.save();
    }

    //update department to new department for users
    await User.updateMany(
      { department: oldDepartment._id },
      { department: newDepartment._id }
    );

    //delete department
    await Department.deleteOne({ _id: req.params.id });

    //return success message
    res.status(200).json({
      success: true,
      message: "Department deletion was successful",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Departments
export const getAllDepartments = async (req, res) => {
  try {
    let departments = await Department.find({ name: { $ne: "transitioning" } }); // get all departments but transitioning

    res.status(200).json({
      success: true,
      message: "All departments obtained",
      departments: departments,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
