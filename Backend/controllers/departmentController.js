const Department = require("../models/Department");

// Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const newDepartment = await Department.create(req.body);
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ message: "Error creating department", error });
  }
};

// Retrieve all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving departments", error });
  }
};

// Retrieve a single department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving department", error });
  }
};

// Update a department by ID
exports.updateDepartment = async (req, res) => {
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ message: "Error updating department", error });
  }
};

// Delete a department by ID
exports.deleteDepartment = async (req, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
    if (!deletedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting department", error });
  }
};
