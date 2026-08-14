const { getConversations } = require('../services/conversationService');

const getConversationsController = async (req, res, next) => {
  try {
    const userId = Number(req.user.id);
    const conversations = await getConversations({ userId });

    return res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    return next(error);
  }
};

module.exports = {
  getConversationsController,
};
