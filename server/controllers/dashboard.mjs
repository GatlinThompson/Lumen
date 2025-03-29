import { EmployeeTraining } from "../models/employee-training.mjs";
import { Role } from "../models/role.mjs";
import { TrainingProgram } from "../models/training-program.mjs";
import { TrainingSession } from "../models/training-session.mjs";
import { User } from "../models/user.mjs";
import jwt from "jsonwebtoken";

//Admin Dashboard*****************************************************************

//get count of users
export const getDashBoardUsers = async (req, res) => {
  try {
    //get active employee count
    let employeeRole = await Role.findOne({ name: "employee" });
    let employees = await User.countDocuments({
      role: employeeRole._id,
      is_active: true,
    });

    //get active trainer count
    let trainerRole = await Role.findOne({ name: "trainer" });
    let trainers = await User.countDocuments({
      role: trainerRole._id,
      is_active: true,
    });

    //get active manager count
    let managerRole = await Role.findOne({ name: "manager" });
    let managers = await User.countDocuments({
      role: managerRole._id,
      is_active: true,
    });

    //user object for users in different roles
    const users = {
      employees: employees,
      trainers: trainers,
      managers: managers,
    };

    //count users
    console.log("User Count");
    console.log(users);
    res
      .status(200)
      .json({ success: true, message: "All users counted", users: users });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Getting users was unsuccessful",
    });
  }
};

//get count of training programs
export const getDashboardPrograms = async (req, res) => {
  try {
    let activePrograms = await TrainingProgram.countDocuments({
      archived: false,
    });

    let archivedPrograms = await TrainingProgram.countDocuments({
      archived: true,
    });

    //get program object
    const programs = {
      active: activePrograms,
      archived: archivedPrograms,
    };

    console.log("Program Count");
    console.log(programs);

    res.status(200).json({
      success: true,
      message: "Training Programs counted",
      programs: programs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Getting training programs was unsuccessful",
    });
  }
};

//Manager Dashboard****************************************************

//get manager assigned trainings
export const getDashboardManagerTrainings = async (req, res) => {
  try {
    //get manager
    let userDecoded = jwt.verify(req.cookies.token, "TEST");
    let manager = await User.findById(userDecoded._id);

    let programs = await TrainingProgram.find({
      assigned_manager: manager,
      archived: false,
    });

    let assignedPrograms = [];

    //find enrollement/completion of each program
    for (const program of programs) {
      //get training details

      //program object
      const programSchema = {
        program: program,
        enrolled: 10,
        assigned: 30,
        completed: 14,
      };

      assignedPrograms = [...assignedPrograms, programSchema]; //add to array
    }

    res.status(200).json({
      success: true,
      message: "Training successfully obtained",
      programs: assignedPrograms,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Getting trainings was unsuccessful",
    });
    console.log(err);
  }
};

//get employees from your department
export const getDepartmentEmployees = async (req, res) => {
  try {
    //get manager infomation
    let userDecoded = jwt.verify(req.cookies.token, "TEST");

    //get employee role
    let employeeRole = await Role.findOne({ name: "employee" });

    //get active employees in manager's department
    let employees = await User.find({
      department: userDecoded.department,
      is_active: true,
      role: employeeRole,
    })
      .populate({ path: "department" })
      .select("-hash -salt");

    res.status(200).json({
      success: true,
      message: "Obtain managers department employees",
      employees: employees,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Getting department employees was unsuccessful",
    });
  }
};

//Trainer Dashboard****************************************************

export const getDashboardTrainerTrainings = async (req, res) => {
  try {
    let userDecoded = jwt.verify(req.cookies.token, "TEST");
    let trainer = await User.findById(userDecoded._id);

    let sessions = await TrainingSession.find({ trainer: trainer._id });

    let assignedSessions = [];

    //loop through each session to get program infomation
    for (const session of sessions) {
      //seperate date and time for session
      const date = session.start_time.toLocaleDateString();
      const time = session.start_time.toLocaleTimeString();

      //get program tied to the session
      let program = await TrainingProgram.find({
        _id: session.training_program,
        archived: false,
      }).select("_id background_color title duration description");

      //session object
      const sessionSchema = {
        session: { date: date, time: time },
        program: program,
      };

      assignedSessions = [...assignedSessions, sessionSchema]; //add to array
    }
    res.status(200).json({
      success: true,
      message: "Trainings Sessions successfully obtained",
      training_sessions: assignedSessions,
    });
  } catch (err) {}
};
