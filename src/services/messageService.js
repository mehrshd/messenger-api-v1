const pool = require('../db');

const sendMessage = async ({ senderId, receiverId, content }) => {
  if (!receiverId) {
    const error = new Error('receiver_id is required');
    error.statusCode = 400;
    throw error;
  }

  if (Number(receiverId) === Number(senderId)) {
    const error = new Error('You cannot send a message to yourself');
    error.statusCode = 400;
    throw error;
  }

  if (!content || content.trim() === '') {
    const error = new Error('Message is empty');
    error.statusCode = 400;
    throw error;
  }

  const [conversationRows] = await pool.promise().query(
    `
      SELECT id
      FROM conversations
      WHERE (user1_id = ? AND user2_id = ?)
         OR (user1_id = ? AND user2_id = ?)
    `,
    [senderId, receiverId, receiverId, senderId]
  );

  let conversationId;

  if (conversationRows.length === 0) {
    const [result] = await pool.promise().query(
      `
        INSERT INTO conversations (user1_id, user2_id)
        VALUES (?, ?)
      `,
      [senderId, receiverId]
    );

    conversationId = result.insertId;
  } else {
    conversationId = conversationRows[0].id;
  }

  await pool.promise().query(
    `
      INSERT INTO messages (conversation_id, sender_id, receiver_id, content)
      VALUES (?, ?, ?, ?)
    `,
    [conversationId, senderId, receiverId, content]
  );

  return { success: true, message: 'Message sent' };
};

module.exports = {
  sendMessage,
};
