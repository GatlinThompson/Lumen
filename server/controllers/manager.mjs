import jwt from "jsonwebtoken";
import { User } from "../models/user.mjs";
import { Role } from "../models/role.mjs";
import { Department } from "../models/department.mjs";
import { EmployeeTraining } from "../models/employee-training.mjs";
import { TrainingProgram } from "../models/training-program.mjs";

export const getUnassignedEmployees = async (req, res) => {
  try {
    //get user from jwt
    let userDecoded = jwt.verify(req.cookies.token, "TEST");

    //get program
    let program = await TrainingProgram.findById(req.params.id);

    //check program
    if (!program) {
      return res
        .status(404)
        .json({ success: false, message: "Program not found" });
    }

    //get manager
    let manager = await User.findById(userDecoded._id);

    //check manager
    if (!manager) {
      return res
        .status(404)
        .json({ success: false, message: "Manager not found" });
    }

    //get employee role
    let employeeRole = await Role.findOne({ name: "employee" }).select("_id");

    let assigned_employees = await EmployeeTraining.find({
      training_program: program._id,
    }).select("enrolled_employee");

    //get employees who are in same department
    let employees = await User.find({
      role: employeeRole,
      department: manager.department,
      is_active: true,
      _id: {
        $nin: assigned_employees.map((employee) => employee.enrolled_employee),
      },
    }).populate("department");

    res.status(200).json({
      success: true,
      message: "Obtained employees successfully",
      employees: employees,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get employees" });
  }
};

export const assignEmployeeTraining = async (req, res) => {
  try {
    //get program
    let program = await TrainingProgram.findById(req.params.id);

    //check if program exists
    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    let employees = await User.find({
      _id: { $in: req.body.assigned_employees },
      is_active: true,
    });

    if (!employees) {
      return res.status(404).json({
        success: false,
        message: "Employees not found",
      });
    }

    //create employeeTrainings array
    const employeeTrainingSchemas = employees.map((employee) => {
      return { enrolled_employee: employee._id, training_program: program._id };
    });

    console.log("Employee Trainings", employeeTrainingSchemas);

    //save trainings
    await EmployeeTraining.insertMany(employeeTrainingSchemas);

    res
      .status(200)
      .json({ success: true, message: "Successfuly assigned employees" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get employees assigned" });
    console.log(err);
  }
};
