const User = require('../models/User');
const Role = require('../models/Role');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User role updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = new Role({ name });
    await role.save();
    res.status(201).json({ message: 'Role created successfully', role });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { name } = req.body;
    const updatedRole = await Role.findByIdAndUpdate(roleId, { name }, { new: true });
    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json({ message: 'Role updated successfully', role: updatedRole });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAllUsers, updateUserRole, createRole, updateRole };
