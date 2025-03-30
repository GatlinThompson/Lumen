import jwt from "jsonwebtoken";
import { TrainingProgram } from "../models/training-program.mjs";
import { TrainingSession } from "../models/training-session.mjs";
import { EmployeeTraining } from "../models/employee-training.mjs";
import { User } from "../models/user.mjs";
export const getUncompletedEmployees = async (req, res) => {
  try {
    //get user from jwt
    let userDecoded = jwt.verify(req.cookies.token, "TEST");

    //check program
    let program = await TrainingProgram.findById(req.params.pid);

    //check program
    if (!program) {
      return res
        .status(404)
        .json({ success: false, message: "Program not found" });
    }
    let sessions = await TrainingSession.find({
      training_program: program._id,
      trainer: userDecoded._id,
    }).select("id");

    const trainerSessions = sessions.map((session) => session._id);

    let getEmployees = await EmployeeTraining.find({
      enrolled_training_session: { $in: trainerSessions },
      training_completed: false,
    });

    const uncompleteEmployeesArr = getEmployees.map(
      (employee) => employee.enrolled_employee
    );

    let employees = await User.find({
      _id: { $in: uncompleteEmployeesArr },
    }).populate({ path: "department" });

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

//Complete Employees
export const completeEmployees = async (req, res) => {
  try {
    //get user from jwt
    let userDecoded = jwt.verify(req.cookies.token, "TEST");

    //check program
    let program = await TrainingProgram.findById(req.params.pid);

    //check program
    if (!program) {
      return res
        .status(404)
        .json({ success: false, message: "Program not found" });
    }

    //get employees
    let employees = await User.find({
      _id: { $in: req.body.completed_employees },
      is_active: true,
    }).select("_id");

    //check employees
    if (!employees) {
      return res.status(404).json({
        success: false,
        message: "Employees not found",
      });
    }

    let trainings = await EmployeeTraining.find({
      training_program: program._id,
      enrolled_employee: { $in: employees },
    });

    console.log(trainings);

    trainings.map((training) => {
      training.training_completed = true;
      training.completion_date = new Date();
    });

    for (const training of trainings) {
      await training.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Successfully completed employees" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to complete employees" });
    console.log(err.message);
  }
};
