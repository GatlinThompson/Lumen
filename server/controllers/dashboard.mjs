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
    let userDecoded = jwt.verify(req.auth_user, "TEST");
    let manager = await User.findById(userDecoded._id);

    let programs = await TrainingProgram.find({
      assigned_manager: manager._id,
      archived: false, deadline: {$gt: new Date()}
    }).sort({deadline: 1}).limit(5);

    let assignedPrograms = [];

    //find enrollement/completion of each program
    for (const program of programs) {
      //get training details
      const assigned = await EmployeeTraining.countDocuments({training_program: program._id})
      const completed = await EmployeeTraining.countDocuments({training_program: program._id, training_completed:true, enrolled_training_session: {$ne: null}})
      const enrolled = await EmployeeTraining.countDocuments({training_program: program._id, training_completed:false, enrolled_training_session: {$ne: null}})

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

//get employees from your department
export const getDepartmentEmployees = async (req, res) => {
  try {
    //get manager infomation
    let userDecoded = jwt.verify(req.auth_user, "TEST");

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
    let userDecoded = jwt.verify(req.auth_user, "TEST");
    let trainer = await User.findById(userDecoded._id);

    let sessions = await TrainingSession.find({ trainer: trainer._id, start_time: {$gt: new Date()} }).populate({path: "training_program"}).sort({start_time: 1}).limit(5);

   

    let assignedSessions = [];

    //loop through each session to get program infomation
    for (const session of sessions) {
     

      //get program tied to the session
      const program = await TrainingProgram.findOne({
        _id: session.training_program,
        archived: false,
      });
  

      program.deadline = session.start_time
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

export const getDashboardEmployeeTrainings = async (req, res) => {
 try {
  let userDecoded = jwt.verify(req.auth_user, "TEST");
    let employee = await User.findById(userDecoded._id);

    let assigned_trainings = await EmployeeTraining.find({enrolled_employee: employee._id})

    assigned_trainings =  assigned_trainings.map(training => {return training.training_program})

 
    const new_programs = await TrainingProgram.find({_id: {$in: assigned_trainings}, archived: false, deadline: {$gt: new Date()}}).sort({deadline: 1}).limit(5);



  let programsArray = []
  for (const program of new_programs) {

    const programSchema = {
      program: program
    }

    programsArray = [...programsArray, programSchema]
  }

res.status(200).json({success: true, message: "Trainings successfuly obtained",
programs: programsArray})
 } catch (err) {
  res.status(500).json({
    success: false,
    message: "Trainings Enrollments unsuccessfully obtained",
  });
 }
}


// Training Insight 
export const employeeDashboardInights = async (req, res) => {
  try {

    let userDecoded = jwt.verify(req.auth_user, "TEST");
    let employee = await User.findById(userDecoded._id);

    let complete = await EmployeeTraining.countDocuments({enrolled_employee: employee._id, training_completed: true});

let overdue  = await EmployeeTraining.countDocuments({enrolled_employee: employee._id, training_completed: false}).populate({path:"training_program", match: {deadline: {$lt: new Date() }}});


    console.log("Completed", complete)
    console.log("Overdue", overdue)

    res.status(200).json({success: true, message: "Training insights successfully obtained", complete: complete, overdue: overdue})
    
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Trainings Insights unsuccessfully obtained",
    });
  }
}

export const trainerDashboardInsight = async (req, res) => {
  try {
    let userDecoded = jwt.verify(req.auth_user, "TEST");
    let trainer = await User.findById(userDecoded._id);

    let sessions = await TrainingSession.find({trainer: trainer._id})

   

    sessions = sessions.map(session => {return session._id})

  
    let complete = await EmployeeTraining.countDocuments({enrolled_training_session: {$in: sessions}, training_completed: true})
    

    let overdue = await EmployeeTraining.countDocuments({enrolled_training_session: {$in: sessions}, training_completed: false}).populate({path: "training_program", match: { deadline: {$lt: new Date()}}})

    res.status(200).json({success: true, message:"Training insights successfully obtained", complete: complete, overdue: overdue})
    
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Trainings Insights unsuccessfully obtained",
      err: err.message
    });
    
  }
}

export const managerDashboardInsights = async (req, res) => {
  try {
    let userDecoded = jwt.verify(req.auth_user, "TEST");
    let manager = await User.findById(userDecoded._id);

     let complete = await EmployeeTraining.countDocuments({training_completed: true}).populate({path: "training_program", match: {assigned_manager: manager._id}})


    
     let overdue_trainings = await EmployeeTraining.find({training_completed: false}).populate({path: "training_program", match: {assigned_manager: manager._id, deadline: {$lt: new Date()}}})

   let overdue = overdue_trainings.map(training => {
    if (training.training_program && training.training_program.assigned_manager && training.training_program.deadline) {
    return training
   }

   
  })
  overdue = overdue.filter(training => training != null)

    console.log("HELLO")
    console.log("Complete:", complete)
    console.log("Overdue:", overdue.length)

    res.status(200).json({success: true, message: "Trainings Insights unsuccessfully obtained",complete: complete, overdue: overdue.length})
    
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Trainings Insights unsuccessfully obtained",
      err: err.message
    });
  }
}