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
} from "../controllers/training-programs.mjs";
import {
  isSuperAdmin,
  isAdmin,
  verifyUser,
} from "../middleware/user-authorization.mjs";
import { getRoleAndDepartments } from "../controllers/admin.mjs";
import { changeName, changePassword } from "../controllers/profile.mjs";

// Define Router
let router = express.Router();

export const configureRoutes = (app) => {
  //User Signup and Login API Calls***************************************************

  app.post("/api/user/register", registerUser);
  app.post("/api/user/signin", signInUser);
  app.get("/api/user/verify", verifyUser, verifiedLoggedInUser);

  //User Name and Password API Calls***************************************************

  app.put("/api/user/change-name", verifyUser, changeName);
  app.put("/api/user/:id/change-password", verifyUser, changePassword);

  //Generic GET API Calls**************************************************************

  //Get Users by Role
  app.get("/api/users/managers", getManagers);
  app.get("/api/users/trainers", getTrainers);
  app.get("/api/users/employees", getEmployees);

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
  app.get("/api/users/everyone", isAdmin, getAllUsers);

  //Admin User API Calls
  app.post("/api/user/create", isAdmin, createUser);
  app.put("/api/user/:id/edit", isAdmin, editUser);
  app.delete("/api/user/:id/delete", isAdmin, deleteUser);

  //Training Program CRUD API Calls
  app.post("/api/training-programs/create", isAdmin, createTrainingProgram);
  app.put("/api/training-programs/:id/edit", isAdmin, editTrainingProgram);

  //Admin Get All Active Training Programs
  app.get("/api/training-programs", isAdmin, getAdminTrainingProgram);

  //Generic Get Single Training Program
  app.get("/api/training-programs/:id", getSingleTrainingProgram);

  //Dashboard API Calls***************************************************************

  app.use("/", router);
};
