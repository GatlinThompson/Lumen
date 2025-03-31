import { Department } from "../models/department.mjs";
import { Role } from "../models/role.mjs";

export const getRoleAndDepartments = async (req, res) => {
  try {
    // get all departments but transitioning
    let departments = await Department.find({
      name: {
        $nin: ["Transitioning", "New Hire", "Human Resources", "Training"],
      },
    });

    let employeeRole = await Role.find({ name: "employee" });

    let otherRoles = await Role.find({
      name: { $nin: ["super_admin", "employee"] },
    }).sort({
      name: 1,
    });

    let roles = [...employeeRole, ...otherRoles];

    const niceRole = roles.map((role) => {
      const firstLetter = role.name.charAt(0).toUpperCase();
      const lastPart = role.name.slice(1);

      const name = firstLetter + lastPart;

      const roleSchema = {
        _id: role._id,
        name: name,
      };

      return roleSchema;
    });
    res.status(200).json({
      success: true,
      message: "Departments and Roles obtained",
      roles: niceRole,
      departments: departments,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
