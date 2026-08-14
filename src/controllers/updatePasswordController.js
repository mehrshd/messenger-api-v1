/*
 * @author aloki
 * @file updatePasswordController.js
 * @date 2026-08-14
 */

const { updatePassword } = require('../services/updatePasswordService');

const updatePasswordController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required',
      });
    }

    const result = await updatePassword({
      userId,
      currentPassword,
      newPassword,
    });

    return res.status(200).json({
      success: true,
      message: result.message,
      data: {
        email: result.email,
      },
    });
  } catch (err) {
    if (
      err.message.includes('Current password is incorrect') ||
      err.message.includes('different from current password')
    ) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    if (err.message.includes('Missing required fields')) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    if (err.message.includes('User not found')) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    console.error('Update password error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Server error occurred',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};

module.exports = {
  updatePasswordController,
};
