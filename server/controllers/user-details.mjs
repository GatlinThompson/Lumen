import { Role } from "../models/role.mjs";
import { User } from "../models/user.mjs";
import { EmployeeTraining } from "../models/employee-training.mjs";
import { TrainingProgram } from "../models/training-program.mjs";
import { Department } from "../models/department.mjs";
import { TrainingSession } from "../models/training-session.mjs";

export const getUserTrainings = async (req, res) => {
  let user = await User.findById(req.params.id);

  //get role then derive out
  let role = await Role.findById(user.role);

  switch (role.name) {
    case "manager":
      getManagerTrainings(req, res, user);
      break;
    case "trainer":
      getTrainerTrainings(req, res, user);
      break;
    case "employee":
      getEmployeeTrainings(req, res, user);
      break;
    default:
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
      break;
  }
};

//get manager assigned trainings
export const getManagerTrainings = async (req, res, user) => {
  try {
    let manager = await User.findById(user._id);

    let programs = await TrainingProgram.find({
      assigned_manager: manager._id,
      archived: false,
      deadline: { $gt: new Date() },
    })
      .sort({ deadline: 1 })
      .limit(5);

    let assignedPrograms = [];

    //find enrollement/completion of each program
    for (const program of programs) {
      //get training details
      const assigned = await EmployeeTraining.countDocuments({
        training_program: program._id,
      });
      const completed = await EmployeeTraining.countDocuments({
        training_program: program._id,
        training_completed: true,
        enrolled_training_session: { $ne: null },
      });
      const enrolled = await EmployeeTraining.countDocuments({
        training_program: program._id,
        training_completed: false,
        enrolled_training_session: { $ne: null },
      });

      //program object
      const programSchema = {
        program: program,
        enrolled: enrolled,
        assigned: assigned,
        completed: completed,
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
  }
};

export const getTrainerTrainings = async (req, res, user) => {
  try {
    let trainer = await User.findById(user._id);

    let sessions = await TrainingSession.find({
      trainer: trainer._id,
      start_time: { $gt: new Date() },
    })
      .populate({ path: "training_program" })
      .sort({ start_time: 1 })
      .limit(5);

    let assignedSessions = [];

    //loop through each session to get program infomation
    for (const session of sessions) {
      //get program tied to the session
      const program = await TrainingProgram.findOne({
        _id: session.training_program,
        archived: false,
      });

      program.deadline = session.start_time;
      //session object
      const sessionSchema = {
        program: program,
      };

      assignedSessions = [...assignedSessions, sessionSchema]; //add to array
    }

    res.status(200).json({
      success: true,
      message: "Trainings Sessions successfully obtained",
      programs: assignedSessions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Trainings Sessions unsuccessfully obtained",
    });
  }
};

export const getEmployeeTrainings = async (req, res, user) => {
  try {
    let employee = await User.findById(user._id);

    let assigned_trainings = await EmployeeTraining.find({
      enrolled_employee: employee._id,
    });

    assigned_trainings = assigned_trainings.map((training) => {
      return training.training_program;
    });

    const new_programs = await TrainingProgram.find({
      _id: { $in: assigned_trainings },
      archived: false,
      deadline: { $gt: new Date() },
    })
      .sort({ deadline: 1 })
      .limit(5);

    let programsArray = [];
    for (const program of new_programs) {
      const programSchema = {
        program: program,
      };

      programsArray = [...programsArray, programSchema];
    }

    res.status(200).json({
      success: true,
      message: "Trainings successfuly obtained",
      programs: programsArray,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Trainings Enrollments unsuccessfully obtained",
    });
  }
};

//get user trainings
export const getAllUserTrainings = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    //check user
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //check role
    let role = await Role.findById(user.role);

    let programs = [];

    if (role.name == "trainer") {
      let sessions = await TrainingSession.find({ trainer: user._id }).populate(
        { path: "training_program", match: { archived: false } }
      );

      sessions = sessions.filter(
        (session) => session.training_program !== null
      );

      const programAlreadyIn = new Set();

      const programsID = sessions.map((session) => {
        if (!programAlreadyIn.has(session.training_program._id))
          programAlreadyIn.add(session.training_program._id);
        return session.training_program._id;
      });

      let trainerPrograms = await TrainingProgram.find({
        _id: { $in: programsID },
        archived: false,
      })
        .select("background_color title")
        .sort({ deadline: 1 });

      programs = trainerPrograms;
    }

    if (role.name == "manager") {
      console.log("Hello");
      let managerPrograms = await TrainingProgram.find({
        assigned_manager: user._id,
        archived: false,
      })
        .select("background_color title")
        .sort({ deadline: 1 });

      programs = managerPrograms;
    }

    res.status(200).json({
      success: true,
      role: role.name,
      programs: programs,
      name: { first_name: user.first_name, last_name: user.last_name },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to obtain training info" });
    console.log(err.message);
  }
};
