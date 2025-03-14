import { Department } from "../models/department.mjs";
import { Role } from "../models/role.mjs";

export const getRoleAndDepartments = async (req, res) => {
  try {
    // get all departments but transitioning
    let departments = await Department.find({
      name: { $nin: ["Transitioning", "New Hire"] },
    });

    let roles = await Role.find({ name: { $ne: "super_admin" } });

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
