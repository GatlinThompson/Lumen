import { TrainingProgram } from "../models/training-program.mjs";
import { TrainingSession } from "../models/training-session.mjs";

export const createTrainingProgram = async (req, res) => {
  try {
    //create new training program
    let program = new TrainingProgram();

    //seperate request body
    const { baseInfo, sessions } = req.body;

    //base training infomation
    program.title = baseInfo.title;
    program.description = baseInfo.description;
    program.deadline = baseInfo.deadline;
    program.assigned_manager = baseInfo.manager;
    program.duration = baseInfo.duration;

    //save program
    await program.save();

    //loop through sessions
    for (const session of sessions) {
      let newSession = new TrainingSession();
      newSession.training_program = program._id;
      newSession.trainer = session.trainer;
      newSession.start_time = session.start_time;

      await newSession.save(); //save training session
    }

    res.status(200).json({
      success: true,
      message: "Training program creation was successful",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Training program creation was unsuccessful",
    });
  }
};
