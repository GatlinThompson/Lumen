import { EmployeeTraining } from "../models/employee-training.mjs";
import { TrainingProgram } from "../models/training-program.mjs";
import { TrainingSession } from "../models/training-session.mjs";
import { User } from "../models/user.mjs";
import jwt from "jsonwebtoken";

export const createTrainingProgram = async (req, res) => {
  try {
    //create new training program
    let program = new TrainingProgram();

    console.log("Creating Training Program");

    //seperate sessions from request
    const { sessions } = req.body;
    if (!sessions || sessions.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Sessions not found" });
    }

    //check managers
    let manager = await User.findById(req.body.assigned_manager).populate({
      path: "role",
      match: { name: "manager" },
    });

    program.title = req.body.title;
    program.duration = parseInt(req.body.duration);
    let new_deadline = new Date(req.body.deadline);
    new_deadline.setDate(new_deadline.getDate() + 1);
    new_deadline.setHours(17, 59, 59, 0);

    program.deadline = new_deadline;
    program.description = req.body.description;
    program.assigned_manager = req.body.assigned_manager;

    //if manager not found
    if (!manager) {
      return res
        .status(404)
        .json({ success: false, message: "Manager not found" });
    }

    //map through sessions
    const sessionPromises = sessions.map(async (session) => {
      let newSession = new TrainingSession();

      newSession.training_program = program._id;
      newSession.trainer = session.trainer;

      // Collect time + date
      let start_time = new Date(`${session.date}T${session.time}`);
      newSession.start_time = start_time;
      //just incase we want to add availability on trainers
      const end_time =
        start_time.getTime() + parseInt(req.body.duration) * 60 * 1000;
      newSession.end_time = end_time;

      // Save the session
      await newSession.save();

      console.log("Session created ID:", newSession._id);

      return newSession._id;
    });

    //make a promise to wait for sessions to be created
    const newSessions = await Promise.all(sessionPromises);

    // Save the session
    program.training_sessions = newSessions;

    //now save program
    await program.save();

    console.log("Program Saved Successfully");

    res.status(200).json({
      success: true,
      message: "Program creation was successful",
      program: program._id,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Program creation was unsuccessful",
    });
    console.log(err.message);
    console.log("Program creation encounter an error");
  }
};

export const getSingleTrainingProgram = async (req, res) => {
  try {
    //get program
    let program = await TrainingProgram.findById(req.params.id);

    //if program isnt found
    if (!program) {
      res.status(404).json({ success: false, message: "Program not found" });
    }

    // get all info for session
    const sessions = program.training_sessions.map(async (training_session) => {
      let session = await TrainingSession.findById(training_session);

      let trainer = await User.findById(session.trainer);
      const sessionSchema = {
        id: session._id,
        trainer: {
          _id: trainer._id,
          background_color: trainer.background_color,
          first_name: trainer.first_name,
          last_name: trainer.last_name,
        },
        start_time: session.start_time,
        end_time: session.end_time,
      };
      return sessionSchema;
    });

    //get assigned manager
    let manager = await User.findById(program.assigned_manager);

    const managerSchema = {
      _id: manager._id,
      first_name: manager.first_name,
      last_name: manager.last_name,
      background_color: manager.background_color,
      department: manager.department,
    };

    let programSessions = await Promise.all(sessions);

    //sort by start time
    programSessions.sort(
      (a, b) => new Date(a.start_time) - new Date(b.start_time)
    );

    program.training_sessions = programSessions;

    const ProgramSchema = {
      _id: program._id,
      title: program.title,
      deadline: program.deadline,
      background_color: program.background_color,
      description: program.description,
      archived: program.archived,
      duration: program.duration,
      assigned_manager: managerSchema,
      training_sessions: programSessions,
    };

    res.status(200).json({
      success: true,
      message: "Session collection obtained",
      program: ProgramSchema,
    });

    //get program sessions
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Error: Please try again!",
      err: err.message,
    });
  }
};

export const editTrainingProgram = async (req, res) => {
  try {
    //get program
    let program = await TrainingProgram.findById(req.params.id);

    //update base info
    //seperate sessions from request
    const { sessions } = req.body;
    if (!sessions || sessions.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Sessions not found" });
    }

    program.title = req.body.title;
    program.duration = parseInt(req.body.duration);
    let new_deadline = new Date(req.body.deadline);
    new_deadline.setDate(new_deadline.getDate() + 1);
    new_deadline.setHours(17, 59, 59, 0);
    program.deadline = new_deadline;
    program.description = req.body.description;

    //deal with deleted/unused sessions
    const formSessionsID = sessions.map((session) => session._id);

    const deletedSessionID = program.training_sessions.filter(
      (session) => !formSessionsID.includes(session._id.toString())
    );
    console.log("Sessions To Be Delete:", deletedSessionID);

    //update sessions
    const sessionPromises = sessions.map(async (session) => {
      if (session._id) {
        let updatedSession = await TrainingSession.findById(session._id);

        updatedSession.trainer = session.trainer;

        //Collect time + date
        const start_time = new Date(`${session.date}T${session.time}`);
        updatedSession.start_time = start_time;
        //just incase we want to add availability on trainers
        const end_time =
          start_time.getTime() + parseInt(req.body.duration) * 60 * 1000;
        updatedSession.end_time = end_time;

        // save updated session
        await updatedSession.save();

        return updatedSession._id;
      } else {
        //create new session
        let newSession = new TrainingSession();
        newSession.training_program = program._id;
        newSession.trainer = session.trainer;
        // Collect time + date
        const start_time = new Date(`${session.date}T${session.time}`);
        newSession.start_time = start_time;
        //just incase we want to add availability on trainers
        const end_time =
          start_time.getTime() + parseInt(req.body.duration) * 60 * 1000;
        newSession.end_time = end_time;
        // Save the session
        await newSession.save();

        return newSession._id;
      }
    });

    //make a promise to wait for sessions to be created
    const updatedSessions = await Promise.all(sessionPromises);

    // update the session
    program.training_sessions = updatedSessions;

    //delete unused sessions
    deletedSessionID.map(async (session) => {
      await TrainingSession.findByIdAndDelete(session);
    });
    console.log("Old Sessions Deleted");

    await program.save();

    res.status(200).json({
      success: true,
      message: "Program update was successful",
      program: program._id,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Program update was unsuccessful",
    });
  }
};

//Archive Training Program
export const archiveTrainingProgram = async (req, res) => {
  try {
    let program = await TrainingProgram.findById(req.params.pid);
    console.log(program);
    program.archived = true;

    await program.save();

    res.status(200).json({
      success: true,
      message: "Program delete was successful",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Program delete was unsuccessful",
      err: err.message,
    });
  }
};

//Get all non-archived trainings
export const getAdminTrainingProgram = async (req, res) => {
  try {
    let programs = await TrainingProgram.find({ archived: false }).select(
      "id background_color title"
    );

    res.status(200).json({
      success: true,
      message: "All programs obtained",
      programs: programs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Programs were not obtained",
    });
  }
};

//get training programs assigned to manager
export const getManagerTrainingProgram = async (req, res) => {
  try {
    //get manager
    let userDecoded = jwt.verify(req.auth_user, "TEST");

    //get programs assigned to manager
    let programs = await TrainingProgram.find({
      archived: false,
      assigned_manager: userDecoded._id,
    }).select("id background_color title");

    res.status(200).json({
      success: true,
      message: "All programs obtained",
      programs: programs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Programs were not obtained",
    });
  }
};

//get training programs assigned to trainer
export const getTrainerTrainingProgram = async (req, res) => {
  try {
    //get trainer
    let userDecoded = jwt.verify(req.auth_user, "TEST");

    let sessions = await TrainingSession.find({
      trainer: userDecoded._id,
      start_time: { $gt: new Date() },
    }).select("-_id training_program");

    //create an array that has unique ids
    let trainingProgramIDs = [
      ...new Set(
        sessions.map((session) => {
          return session.training_program;
        })
      ),
    ];

    //get all programs that match the ids
    let programs = await TrainingProgram.find({
      _id: { $in: trainingProgramIDs },
      archived: false,
    }).select("id background_color title");

    console.log(programs);

    res.status(200).json({
      success: true,
      message: "All programs obtained",
      programs: programs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Programs were not obtained",
    });
  }
};

export const getEmployeeTrainingProgram = async (req, res) => {
  try {
    //get trainer
    let userDecoded = jwt.verify(req.auth_user, "TEST");

    let trainings = await EmployeeTraining.find({
      enrolled_employee: userDecoded._id,
      training_completed: false,
    }).select("training_program");

    console.log(trainings);

    //create an array that has unique ids
    let trainingProgramIDs = trainings.map((training) => {
      return training.training_program;
    });

    let programs = await TrainingProgram.find({
      _id: { $in: trainingProgramIDs },
    });

    res.status(200).json({
      success: true,
      message: "All programs obtained",
      programs: programs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Programs were not obtained",
    });
  }
};

//Enroll Employeee
export const EnrollEmployee = async (req, res) => {
  try {
    //session
    console.log(req);
    let session = await TrainingSession.findById(req.body.session);

    //check if session exists
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Training Session not found.",
      });
    }

    //get user
    let userDecoded = jwt.verify(req.auth_user, "TEST");
    let employee = await User.findById(req.body.user);

    //check if employee exists
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    console.log(session);

    //get program
    let program = await TrainingProgram.findById(req.params.pid);

    //check program
    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Training Program not found.",
      });
    }

    //get employee training
    let employeeTraining = await EmployeeTraining.findOne({
      training_program: program._id,
      enrolled_employee: employee._id,
    });

    //check employee training

    if (!employeeTraining) {
      return res.status(404).json({
        success: false,
        message: "Employee training assignment not found.",
      });
    }

    //update date and session and reset other values to not complete state
    employeeTraining.enrolled_date = new Date();
    employeeTraining.enrolled_training_session = session._id;
    employeeTraining.completion_date = null;
    employeeTraining.training_completed = false;

    await employeeTraining.save();

    res.status(200).json({ success: true, message: "Enrollment Successful" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unabled to enroll in training session",
      err: err.message,
    });
  }
};

//Get employee sessions enrollment
export const getEmployeeEnrollment = async (req, res) => {
  try {
    let training = await EmployeeTraining.findOne({
      enrolled_employee: req.params.uid,
      training_program: req.params.pid,
    }).select("enrolled_training_session");

    console.log(training);

    res.status(200).json({
      success: true,
      messag: "Enrolled training session obtained",
      enrolledSession: training,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unabled to get enrolled training session",
      err: err.message,
    });
  }
};
