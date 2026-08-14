# Chat Application API

A modern Node.js REST API for real-time chat functionality with JWT authentication and secure password management.

## Features

- **User Authentication**: JWT-based login system with 1-hour expiry
- **Secure Messaging**: Send messages with receiver validation and encryption
- **Conversation Management**: List all conversations with other user details
- **Password Security**: bcrypt hashing with plaintext/hash compatibility
- **Code Signature**: Encrypted author verification at startup
- **Clean Architecture**: Service/Controller/Route pattern with async/await
- **Error Handling**: Comprehensive error management and validation

## Prerequisites

- Node.js (v14 or higher)
- MySQL Database
- npm or yarn

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/chat-app.git
cd chat-app

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your database credentials
# DATABASE_HOST=localhost
# DATABASE_USER=root
# DATABASE_PASSWORD=your_password
# DATABASE_NAME=chat_db
# JWT_SECRET=your_secret_key
# PORT=3000

# Start the server
npm start

# Or with auto-reload
npm run dev
```

## API Endpoints

### Authentication

```
POST /login
Body: { email, password }
Response: { success, token, user }
```

### Messages

```
POST /sendMessage
Authorization: Bearer <token>
Body: { receiver_id, content }
Response: { success, message, message_id }
```

### Conversations

```
GET /conversation
Authorization: Bearer <token>
Response: { success, conversations }
```

### Account

```
POST /updatePassword
Authorization: Bearer <token>
Body: { currentPassword, newPassword }
Response: { success, message }

GET /profile
Authorization: Bearer <token>
Response: { success, user }
```

## Project Structure

```
src/
├── app.js                    # Express app configuration
├── db.js                     # Database connection
├── server.js                 # Entry point
├── middleware/
│   └── authMiddleware.js    # JWT verification
├── routes/
│   ├── users/
│   │   ├── auth/            # Login routes
│   │   ├── log/             # Login routes
│   │   ├── updatePassword/  # Password update
│   │   └── profile/         # User profile
│   └── chats/
│       ├── messages/        # Message routes
│       └── Conversation/    # Conversation routes
├── controllers/
│   ├── updatePasswordController.js
│   ├── messageController.js
│   └── conversationController.js
└── services/
    ├── updatePasswordService.js
    ├── messageService.js
    └── conversationService.js
```

## Database Schema

### users

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  full_name VARCHAR(255),
  avatar_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### conversations

```sql
CREATE TABLE conversations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user1_id INT,
  user2_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user1_id) REFERENCES users(id),
  FOREIGN KEY (user2_id) REFERENCES users(id)
);
```

### messages

```sql
CREATE TABLE messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  conversation_id INT,
  sender_id INT,
  receiver_id INT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);
```

## Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcrypt
- **Encryption**: crypto (built-in)
- **CORS**: cors package

## Environment Variables

```
PORT=3000
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_NAME=chat_db
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=1h
NODE_ENV=development
SIGNATURE_KEY=aloki-secret-key-2026-chat-app
```

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token expiry (1 hour)
- Encrypted code signature verification
- Protected routes with middleware
- Input validation on all endpoints
- Environment variable security

## Error Handling

All endpoints return standard JSON responses:

**Success Response:**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error description"
}
```

## Development

### Scripts

```bash
npm start          # Start production server
npm run dev        # Start with nodemon (auto-reload)
```

### Linting

```bash
npm run lint       # Check code style
npm run lint:fix   # Fix linting issues
```

## Testing

Use Postman or cURL to test endpoints:

```bash
# Login
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get conversations
curl -X GET http://localhost:3000/conversation \
  -H "Authorization: Bearer YOUR_TOKEN"

# Send message
curl -X POST http://localhost:3000/sendMessage \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"receiver_id":2,"content":"Hello!"}'
```

## Known Issues

- Plaintext passwords are supported for backward compatibility but new users should use bcrypt-hashed passwords
- Token expiry is fixed at 1 hour (consider adding refresh tokens)
- No rate limiting implemented (recommended for production)

## Roadmap

- [ ] Add input validation middleware
- [ ] Implement rate limiting
- [ ] Add unit tests
- [ ] Add API documentation (Swagger)
- [ ] Implement message search
- [ ] Add message deletion
- [ ] Real-time updates with WebSockets
- [ ] File upload support

## Author

**aloki**

Copyright © 2026. All rights reserved.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions, please create an issue on GitHub.

---

**Built with ❤️ using Node.js and Express**
