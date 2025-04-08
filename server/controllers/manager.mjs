import jwt from "jsonwebtoken";
import { User } from "../models/user.mjs";
import { Role } from "../models/role.mjs";
import { Department } from "../models/department.mjs";
import { EmployeeTraining } from "../models/employee-training.mjs";
import { TrainingProgram } from "../models/training-program.mjs";

export const getUnassignedEmployees = async (req, res) => {
  try {
    //get user from jwt
    let userDecoded = jwt.verify(req.auth_user, "TEST");

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
    })
      .populate("department")
      .select("-salt -hash");

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

export const getAssignedEmployees = async (req, res) => {
  try {
    //get program
    let program = await TrainingProgram.findById(req.params.id);
    //check if program exists
    if (!program) {
      return res
        .status(200)
        .json({ success: false, message: "Training Program not found" });
    }

    let assignedEmployees = await EmployeeTraining.find({
      training_program: program._id,
    }).select("enrolled_employee");

    const employeesID = assignedEmployees.map((employee) => {
      return employee.enrolled_employee;
    });

    let employees = await User.find({ _id: { $in: employeesID } })
      .populate({
        path: "department",
      })
      .select("-hash -salt");

    let assignedemployeesPromises = employees.map(async (emp) => {
      let status = "enrolled";

      let not_enrolled = await EmployeeTraining.findOne({
        enrolled_employee: emp._id,
        training_program: program._id,
        training_completed: false,
        enrolled_training_session: null,
      });

      if (not_enrolled) {
        status = "not-enrolled";
      }

      let complete = await EmployeeTraining.findOne({
        enrolled_employee: emp._id,
        training_program: program._id,
        training_completed: true,
      });

      if (complete) {
        status = "complete";
      }

      return { ...emp._doc, status: status };
    });

    const assignedemployees = await Promise.all(assignedemployeesPromises);

    console.log("Assigned", assignedemployees);

    res.status(200).json({
      success: true,
      message: "Assigned employees obtained",
      employees: assignedemployees,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get assigned employees" });
    console.log(err);
  }
};

export const getAssignedEmployeesCount = async (req, res) => {
  try {
    //get program
    let program = await TrainingProgram.findOne({ _id: req.params.pid });

    //check program
    if (!program) {
      return res
        .status(404)
        .json({ success: false, message: "Program not found" });
    }

    //get all assigned employe count
    let assigned = await EmployeeTraining.countDocuments({
      training_program: program._id,
    });

    //get all employees who match the program in training sessions
    let enrolled = await EmployeeTraining.countDocuments({
      training_program: program._id,
      enrolled_training_session: { $ne: null },
      training_completed: false,
    });

    let not_enrolled = await EmployeeTraining.countDocuments({
      training_program: program._id,
      training_completed: false,
      enrolled_training_session: null,
    });

    let completed = await EmployeeTraining.countDocuments({
      training_program: program._id,
      enrolled_training_session: { $ne: null },
      training_completed: true,
    });

    //Get overdue
    let overdue;
    //set dates to play with
    let deadline = program.deadline;
    let today = new Date();

    //check if today is earlier than the deadline
    console.log("Is before deadline:", today < deadline);
    if (today < deadline) {
      overdue = 0;
    } else {
      overdue = await EmployeeTraining.countDocuments({
        training_program: program._id,
        training_completed: false,
      });
    }

    const assignedSchema = {
      total: assigned,
      completed: completed,
      enrolled: enrolled,
      overdue: overdue,
      not_enrolled: not_enrolled,
    };

    res.status(200).json({
      success: true,
      message: "Obtained Assigned Employee Counts",
      assigned: assignedSchema,
    });

    console.log("Assigned", assigned);
    console.log("Enrolled", enrolled);
    console.log("Completed", completed);
    //console.log("Overdue", overdue);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get employees assigned",
      err: err.message,
    });
  }
};

//Unassign Employee
export const unassignEmployee = async (req, res) => {
  try {
    //get program
    let program = await TrainingProgram.findById(req.params.pid);

    //check program
    if (!program) {
      return res
        .status(404)
        .json({ success: false, message: "Training program not found" });
    }

    //get employee
    let employee = await User.findById(req.params.eid);

    //check employee
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    //find and delete document
    await EmployeeTraining.findOneAndDelete({
      training_program: program._id,
      enrolled_employee: employee._id,
    });

    res
      .status(200)
      .json({ success: true, message: "Employee unassigned successfu" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get employee unassigned",
      err: err.message,
    });
  }
};
