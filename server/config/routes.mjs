import express from "express";
import { User } from "../models/user.mjs";
import { Role } from "../models/role.mjs";
import {
  registerUser,
  signInUser,
  verifiedLoggedInUser,
  createUser,
  editUser,
  deleteUser,
  getManagers,
  getTrainers,
  getEmployees,
  getAllUsers,
  logoutUser,
  getSpecificUser,
} from "../controllers/users.mjs";
import { createRole, deleteRole, editRole } from "../controllers/roles.mjs";
import {
  createDepartment,
  editDepartment,
  deleteDepartment,
} from "../controllers/departments.mjs";
import {
  createTrainingProgram,
  getSingleTrainingProgram,
  editTrainingProgram,
  getAdminTrainingProgram,
  getManagerTrainingProgram,
  getTrainerTrainingProgram,
  getEmployeeTrainingProgram,
  archiveTrainingProgram,
  EnrollEmployee,
  getEmployeeEnrollment,
} from "../controllers/training-programs.mjs";
import {
  isSuperAdmin,
  isAdmin,
  verifyUser,
  isManager,
  isTrainer,
  isEmployee,
} from "../middleware/user-authorization.mjs";
import { getRoleAndDepartments } from "../controllers/admin.mjs";
import { changeName, changePassword } from "../controllers/profile.mjs";
import {
  getDashboardEmployeeTrainings,
  getDashboardManagerTrainings,
  getDashboardPrograms,
  getDashboardTrainerTrainings,
  getDashBoardUsers,
  getDepartmentEmployees,
} from "../controllers/dashboard.mjs";
import {
  assignEmployeeTraining,
  getAssignedEmployees,
  getAssignedEmployeesCount,
  getUnassignedEmployees,
  unassignEmployee,
} from "../controllers/manager.mjs";
import {
  completeEmployees,
  getTrainingEnrollmentCount,
  getUncompletedEmployees,
  trainerGetAssignedEmployees,
} from "../controllers/trainer.mjs";

// Define Router
let router = express.Router();

export const configureRoutes = (app) => {
  //User Signup and Login API Calls***************************************************

  app.post("/api/user/register", registerUser);
  app.post("/api/user/signin", signInUser);
  app.get("/api/user/verify", verifyUser, verifiedLoggedInUser);
  app.post("/api/user/logout", logoutUser);

  //User Name and Password API Calls***************************************************

  app.put("/api/user/change-name", verifyUser, changeName);
  app.put("/api/user/change-password", verifyUser, changePassword);

  //Generic GET API Calls**************************************************************

  //Get Users by Role
  app.get("/api/users/managers", getManagers);
  app.get("/api/users/trainers", getTrainers);
  app.get("/api/users/employees", getEmployees);

  //Get Specific User
  app.get("/api/user/:id", getSpecificUser);

  //Super Admin API Calls*************************************************************

  //Role API Calls
  app.post("/api/role/create", isSuperAdmin, createRole);
  app.put("/api/role/:id/edit", isSuperAdmin, editRole);
  app.delete("/api/role/:id/delete", isSuperAdmin, deleteRole);

  //Department API Calls
  app.post("/api/department/create", isSuperAdmin, createDepartment);
  app.put("/api/department/:id/edit", isSuperAdmin, editDepartment);
  app.delete("/api/department/:id/delete", isSuperAdmin, deleteDepartment);

  //Admin API Calls*******************************************************************

  //Call Role & Department
  app.get("/api/admin/roles-and-departments", isAdmin, getRoleAndDepartments);

  //Get All Users
  app.get("/api/users", isAdmin, getAllUsers);

  //Admin User API Calls
  app.post("/api/user/create", isAdmin, createUser);
  app.put("/api/user/:id/edit", isAdmin, editUser);
  app.delete("/api/user/:id/delete", isAdmin, deleteUser);

  //Manager API Calls*******************************************************************

  app.get("/api/users/manager", isManager, getDepartmentEmployees);

  //Training Page API Call************************************************************

  //Training Program CRUD API Calls
  app.post("/api/training-programs/create", isAdmin, createTrainingProgram);
  app.put("/api/training-programs/:id/edit", isAdmin, editTrainingProgram);
  app.delete(
    "/api/training-program/:pid/delete",
    isAdmin,
    archiveTrainingProgram
  );

  //Admin Get All Active Training Programs
  app.get("/api/training-programs/admin", isAdmin, getAdminTrainingProgram);

  //Manager Get All Active Assigned Programs
  app.get(
    "/api/training-programs/manager",
    isManager,
    getManagerTrainingProgram
  );
  //Trainer Get All Active Assigned Programs
  app.get(
    "/api/training-programs/trainer",
    isTrainer,
    getTrainerTrainingProgram
  );

  //Trainer Get All Active Assigned Programs
  app.get(
    "/api/training-programs/employee",
    isEmployee,
    getEmployeeTrainingProgram
  );

  //Generic Get Single Training Program
  app.get("/api/training-programs/:id", getSingleTrainingProgram);

  //Manager Training API

  //Get unassigned department employees
  app.get(
    "/api/training-program/:id/employees/unassigned",
    isManager,
    getUnassignedEmployees
  );
  //Get assigned employees
  app.get(
    "/api/training-program/:id/employees/assigned",
    isManager,
    getAssignedEmployees
  );

  //Assign Employeees
  app.post(
    "/api/training-program/:id/employees/assign",
    isManager,
    assignEmployeeTraining
  );

  //Unassign Employee
  app.delete(
    "/api/training-program/:pid/employees/unassign/:eid",
    isManager,
    unassignEmployee
  );

  //Trainer Training API
  app.get(
    "/api/training-program/:pid/employees/uncomplete",
    isTrainer,
    getUncompletedEmployees
  );

  app.post("/api/training-program/:pid/employees/complete", completeEmployees);

  //Training Details Widgets API Calls************************************************

  //Employee

  app.get(
    "/api/training-programs/:pid/enroll/:uid",
    isEmployee,
    getEmployeeEnrollment
  );
  app.post("/api/training-programs/:pid/enroll", isEmployee, EnrollEmployee);

  //Manager

  app.get(
    "/api/training-program/:pid/assign-count",
    isManager,
    getAssignedEmployeesCount
  );

  //Trainer
  app.post(
    "/api/training-programs/:pid/enrollment-count",
    isTrainer,
    getTrainingEnrollmentCount
  );

  app.post(
    "/api/traing-programs/:pid/trainer/assigned",
    trainerGetAssignedEmployees
  );

  //Dashboard API Calls***************************************************************

  //Admin Dashboard

  //User Count
  app.get("/api/dashboard/users", isAdmin, getDashBoardUsers);

  //Training Program Count
  app.get("/api/dashboard/programs", isAdmin, getDashboardPrograms);

  //Manager Dashboard

  //get assigned training
  app.get(
    "/api/dashboard/manager-trainings",
    isManager,
    getDashboardManagerTrainings
  );

  //Get department employees
  app.get("/api/dashboard/employees", isManager, getDepartmentEmployees);

  //Trainer Dashboard

  app.get(
    "/api/dashboard/trainer-trainings",
    isTrainer,
    getDashboardTrainerTrainings
  );

  // Employee Dashboard
    app.get("/api/dashboard/employee-trainings", isEmployee, getDashboardEmployeeTrainings)

  app.use("/", router);
};
