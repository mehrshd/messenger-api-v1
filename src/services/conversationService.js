const dataBase = require('../db');

const getConversations = async ({ userId }) => {
  const sql = `
    SELECT
      c.id,
      c.user1_id,
      c.user2_id,
      CASE
        WHEN c.user1_id = ? THEN c.user2_id
        ELSE c.user1_id
      END AS other_user_id,
      u.full_name AS other_user_name,
      u.avatar_url AS other_user_avatar
    FROM conversations c
    LEFT JOIN users u
      ON u.id = CASE
        WHEN c.user1_id = ? THEN c.user2_id
        ELSE c.user1_id
      END
    WHERE c.user1_id = ? OR c.user2_id = ?
    ORDER BY c.id DESC
  `;

  const [rows] = await dataBase.promise().query(sql, [userId, userId, userId, userId]);

  return rows;
};

module.exports = {
  getConversations,
};
