import User from '../models/User.js';

export const getAdminStats = async (req, res) => {
  try {
    const totals = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
      { $project: { role: '$_id', count: 1, _id: 0 } }
    ]);

    const totalUsers = await User.countDocuments();
    res.json({ totals, totalUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to load admin statistics.' });
  }
};

export const getManagerSummary = async (req, res) => {
  try {
    const teamSize = await User.countDocuments({ role: 'User' });
    res.json({ teamSize, activeProjects: 8, pendingApprovals: 4 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to load manager summary.' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to load user profile.' });
  }
};
