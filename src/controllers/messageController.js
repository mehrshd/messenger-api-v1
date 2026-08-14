const { sendMessage } = require('../services/messageService');

const sendMessageController = async (req, res, next) => {
  try {
    const senderId = Number(req.user.id);
    const { receiver_id, content } = req.body;

    const result = await sendMessage({
      senderId,
      receiverId: Number(receiver_id),
      content,
    });

    return res.status(200).json({
      message: result.message,
      status: true,
      data: result,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      message: error.message || 'Cannot send message',
      status: false,
      error: statusCode === 500 ? error : undefined,
    });
  }
};

module.exports = {
  sendMessageController,
};
